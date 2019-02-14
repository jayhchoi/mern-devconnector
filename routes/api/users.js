const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../../models/User');
const { SECRET_OR_KEY } = require('../../config/keys');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// @route GET api/users/test
// @desc  Tests users route
// @access  Public
router.get('/test', (req, res) => res.send({ msg: 'Users routes works' }));

// @route GET api/users/register
// @desc  Register user
// @access  Public
router.post('/register', async (req, res) => {
  const { email } = req.body;

  // Input validation
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).send(errors);
    } else {
      // user === null
      // Get avatar from gravatar
      const avatar = gravatar.url(email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default img
      });

      const newUser = new User({
        ...req.body,
        avatar
      });

      // Hash password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          try {
            newUser.password = hash;
            const user = await newUser.save(); // save is async function that returns the saved document
            res.send(user);
          } catch (err) {
            res.status(400).send(err);
          }
        });
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route GET api/users/login
// @desc  Login user / Return JWT Token
// @access  Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Input validation
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).send(errors);
  }

  try {
    const user = await User.findOne({ email });

    // User not exist
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).send(errors);
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password); // compares string vs. the hashed

    if (isMatch) {
      // Create token
      const payload = {
        // This is data to be tokenized: in turn, these data is contained in the token
        // All user attributes except for password
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      };

      const token = jwt.sign(payload, SECRET_OR_KEY, { expiresIn: '24h' });

      res.send({ success: true, token: 'Bearer ' + token });
    } else {
      errors.password = 'Password incorrect';
      res.status(400).send(errors);
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// @route GET api/users/current
// @desc  Return current user
// @access  Private: loginRequired
// @middleware  passport.authenticate
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }), // This is what the JwtStrategy config was for
  (req, res) => {
    res.send(req.user);
  }
);

module.exports = router;
