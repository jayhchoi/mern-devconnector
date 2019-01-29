const validator = require('validator');

module.exports = validateLoginInput = data => {
  let errors = {};

  const { email = '', password = '' } = data;

  if (!validator.isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(email)) {
    errors.email = 'Email field is required';
  }

  if (validator.isEmpty(password)) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
