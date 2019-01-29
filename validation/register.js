const validator = require('validator');

module.exports = validateRegisterInput = data => {
  let errors = {};

  const { name = '', email = '', password = '', password2 = '' } = data;

  if (!validator.isLength(name, { min: 2, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 chars';
  }

  if (validator.isEmpty(name)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (!validator.isLength(password, { min: 8, max: 30 })) {
    errors.password = 'Password must be at least 8 chars';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  if (!validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match';
  }

  if (validator.isEmpty(password2)) {
    errors.password2 = 'Confirm Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
