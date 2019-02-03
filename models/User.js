const mongoose = require('mongoose');
const { Schema } = mongoose;
const _ = require('lodash');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
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

// Overriding given method to pick what fields to send
userSchema.methods.toJSON = function() {
  const user = this;
  const userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'name', 'avatar']);
};

module.exports = User = mongoose.model('User', userSchema);
