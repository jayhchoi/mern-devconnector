const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../config/keys');

// @route GET api/users/test
// @desc  Tests users route
// @access  Public
router.get('/test', (req, res) => res.send({ msg: 'Users routes works' }));

// @route GET api/users/register
// @desc  Register user
// @access  Public
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      if (user) {
        return res.status(400).send({ email: 'Email already exists' });
      } else {
        // Get avatar from gravatar
        const avatar = gravatar.url(email, {
          s: '200', // Size
          r: 'pg', // Rating
          d: 'mm' // Default img
        });

        const newUser = new User({
          name,
          email,
          password,
          avatar
        });

        // Hash password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.send(user))
              .catch(err => console.log(err));
          });
        });
      }
    })
    .catch(err => console.log(err));
});

// @route GET api/users/login
// @desc  Login user / Return JWT Token
// @access  Public
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then(user => {
      // Check for user
      if (!user) {
        return res.status(404).send({ email: 'User not found' });
      }

      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // Create token
          const payload = {
            _id: user._id,
            name: user.name,
            avatar: user.avatar
          };

          jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' }, (err, token) => {
            res.send({
              success: true,
              token: 'Bearer ' + token
            });
          });
        } else {
          res.status(400).send({ password: 'Password incorrect' });
        }
      });
    })
    .catch(err => console.log(err));
});

module.exports = router;
