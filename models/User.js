const mongoose = require('mongoose');
const { Schema } = mongoose;
const _ = require('lodash');

const userSchema = new Schema({
  // Required
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  }
});

// Overriding given method to pick what fields to send res
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.omit(userObject, ['password']);
};

module.exports = User = mongoose.model('User', userSchema);
