const mongoose = require('mongoose');
const { Schema } = mongoose;

const profileSchema = new Schema({
  // Required
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // One-to-one relationship
  },
  handle: {
    type: String,
    max: 40,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  skills: {
    type: [String], // Array of strings
    required: true
  },
  // Optional
  company: {
    type: String
  },
  website: {
    type: String
  },
  location: {
    type: String
  },
  bio: {
    type: String
  },
  githubusername: {
    type: String
  },
  experience: [
    // Array of objects
    {
      // Required
      title: {
        type: String,
        required: true
      },
      company: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      // Optional
      location: {
        type: String
      },
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      // Required
      school: {
        type: String,
        required: true
      },
      degree: {
        type: String,
        required: true
      },
      fieldofstudy: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      // Optional
      to: {
        type: Date
      },
      current: {
        type: Boolean,
        default: false
      },
      description: {
        type: String
      }
    }
  ],
  social: {
    // Object
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    },
    youtube: {
      type: String
    },
    twitter: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model('Profile', profileSchema);
