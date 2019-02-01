const validator = require('validator');

module.exports = validatePostInput = data => {
  const errors = {};

  const { text = '' } = data;

  if (!validator.isLength(text, { min: 10, max: 300 })) {
    errors.text = 'Text must be between 10 and 300 chars';
  }

  if (validator.isEmpty(text)) {
    errors.text = 'Text field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
