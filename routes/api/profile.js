const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongoose').Types;
const passport = require('passport');
const _ = require('lodash');

const User = require('../../models/User');
const Profile = require('../../models/Profile');

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
    try {
      const profile = await Profile.findOne({ user: req.user._id }).populate(
        'user',
        ['name', 'avatar']
      ); // This 'user' is from Model > 'ref'

      if (!profile) {
        // It's OK not to have a profile, thus NO 404 ERROR
        return res.send(null); // This actually returns an empty string "" rather than 'null'
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
  async (req, res) => {
    // Validation
    const { errors, isValid } = validateProfileInput(req.body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    // Get fields
    console.log(req.body);
    const newProfile = new Profile({
      ...req.body,
      social: {
        facebook: req.body.facebook,
        twitter: req.body.twitter,
        linkedin: req.body.linkedin,
        youtube: req.body.youtube,
        instagram: req.body.instagram
      },
      user: req.user._id
    });

    // convert string to array
    if (newProfile.skills.length === 1)
      newProfile.skills = newProfile.skills[0].split(',');

    try {
      // Check for profile
      const profile = await Profile.findOne({ user: req.user._id });

      // If profile already exists, update it
      // Again, if mongoose does not find a doc, it returns 'null' (NOT AN EMPTY OBJ)
      if (profile) {
        try {
          const updatedProfile = await Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: newProfile },
            { new: true }
          );

          res.send(updatedProfile);
        } catch (err) {
          res.status(400).send(err);
        }
      } else {
        // Create a profile
        try {
          // Check if handle exists
          const existingProfile = await Profile.findOne({
            handle: newProfile.handle
          });
          if (existingProfile) {
            errors.handle = 'That handle already exists';
            return res.status(400).send(errors);
          }

          const savedProfile = await newProfile.save();
          res.send(savedProfile);
        } catch (err) {
          res.status(400).send(err);
        }
      }
    } catch (err) {
      res.status(400).send(err);
    }
  }
);

// ##################### Start from here #############################

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
        const removeIndex = _.findIndex(profile.experience, [
          '_id',
          ObjectId(req.params.exp_id)
        ]);
        profile.experience.splice(removeIndex, 1);

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
        const removeIndex = _.findIndex(profile.education, [
          '_id',
          ObjectId(req.params.edu_id)
        ]);
        profile.education.splice(removeIndex, 1);

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
