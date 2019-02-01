const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

// @route GET api/profile/test
// @desc  Tests profile route
// @access  Public
router.get('/test', (req, res) => res.send({ msg: 'Profile routes works' }));

// @route GET api/profile
// @desc  Fetch current user profile
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};

    try {
      const profile = await Profile.findOne({ user: req.user._id }).populate(
        'user',
        ['name', 'avatar']
      ); // This 'user' is from Model > 'ref'

      if (!profile) {
        errors.profile = 'No profile found';
        return res.status(404).send(errors);
      }

      res.send(profile);
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// @route POST api/profile
// @desc  Create AND Update user profile
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Get fields
    const profileFields = _.pick(req.body, [
      'handle',
      'company',
      'website',
      'location',
      'bio',
      'status',
      'githubusername',
      'skills',
      'social'
    ]);

    profileFields.user = req.user._id;
    if (profileFields.skills)
      profileFields.skills = profileFields.skills.split(','); // convert string to array

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (profile) {
          // Update profile
          Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: profileFields },
            { new: true }
          )
            .then(profile => res.send(profile))
            .catch(err => res.status(400).send(err));
        } else {
          // Craete profile
          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'That handle already exists';
                return res.status(400).send(errors);
              }

              // Save profile
              new Profile(profileFields)
                .save()
                .then(profile => res.send(profile))
                .catch(err => res.status(400).send(err));
            })
            .catch(err => res.status(400).send(err));
        }
      })
      .catch(err => res.status(400).send(err));
  }
);

// @route GET api/profile/handle/:handle
// @desc  Fetch user profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
  const errors = {};

  Profile.findOne({ handle: req.params.handle })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'Profile not found';
        return res.status(404).send(errors);
      }

      res.send(profile);
    })
    .catch(err => res.status(400).send(err));
});

// @route GET api/profile/user/:user_id
// @desc  Fetch user profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
  const errors = {};

  Profile.findOne({ user: req.params.user_id })
    .populate('user', ['name', 'avatar'])
    .then(profile => {
      if (!profile) {
        errors.profile = 'Profile not found';
        return res.status(404).send(errors);
      }

      res.send(profile);
    })
    .catch(err => res.status(400).send(err));
});

// @route GET api/profile/all
// @desc  Fetch all user profiles
// @access  Public
router.get('/all', (req, res) => {
  const errors = {};

  Profile.find({})
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
      if (profiles.length === 0) {
        errors.profiles = 'No profiles found';
        return res.status(404).send(errors);
      }

      res.send(profiles);
    })
    .catch(err => res.status(400).send(err));
});

// @route POST api/profile/experience
// @desc  Add experience to profile
// @access  Private
router.post(
  '/experience',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation
    const { errors, isValid } = validateExperienceInput(req.body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Get input
    const newExp = _.pick(req.body, [
      'title',
      'company',
      'location',
      'from',
      'to',
      'current',
      'description'
    ]);

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile) {
          errors.profile = 'Profile not found';
          return res.status(404).send(errors);
        }

        profile.experience.unshift(newExp);

        profile
          .save()
          .then(profile => {
            res.send(profile);
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
);

// @route DELETE api/profile/experience/:exp_id
// @desc  Delete experience from profile
// @access  Private
router.delete(
  '/experience/:exp_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile) {
          errors.profile = 'Profile not found';
          return res.status(404).send(errors);
        }

        // Delete experiecne by exp_id
        const removeIndex = _.findIndex(
          profile.experience,
          item => item._id === req.params.exp_id
        );
        profile.experience.splice(removeIndex);

        profile
          .save()
          .then(profile => {
            res.send(profile);
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
);

// @route POST api/profile/education
// @desc  Add education to profile
// @access  Private
router.post(
  '/education',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    // Validation
    const { errors, isValid } = validateEducationInput(req.body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Get input
    const newEdu = _.pick(req.body, [
      'school',
      'degree',
      'fieldofstudy',
      'from',
      'to',
      'current',
      'description'
    ]);

    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile) {
          errors.profile = 'Profile not found';
          return res.status(404).send(errors);
        }

        profile.education.unshift(newEdu);

        profile
          .save()
          .then(profile => {
            res.send(profile);
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
);

// @route DELETE api/profile/education/:edu_id
// @desc  Delete education from profile
// @access  Private
router.delete(
  '/education/:edu_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user._id })
      .then(profile => {
        if (!profile) {
          errors.profile = 'Profile not found';
          return res.status(404).send(errors);
        }

        // Delete education by edu_id
        const removeIndex = _.findIndex(
          profile.education,
          item => item._id === req.params.edu_id
        );
        profile.education.splice(removeIndex);

        profile
          .save()
          .then(profile => {
            res.send(profile);
          })
          .catch(err => res.status(400).send(err));
      })
      .catch(err => res.status(400).send(err));
  }
);

// @route DELETE api/profile
// @desc  Delete user AND profile
// @access  Private
router.delete(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user._id }).then(() => {
      User.findOneAndRemove({ _id: req.user._id }).then(() => res.send());
    });
  }
);

module.exports = router;
