const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
  // Required
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User' // One-to-one relationship
  },
  text: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  // Optional
  updated: {
    type: Date
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  comments: [
    {
      // Required
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      },
      text: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      avatar: {
        type: String,
        required: true
      }
    }
  ]
});

module.exports = Post = mongoose.model('Post', postSchema);
