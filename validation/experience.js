const validator = require('validator');

module.exports = validateExperienceInput = data => {
  const errors = {};

  const { title = '', company = '', from = '' } = data;

  if (validator.isEmpty(title)) {
    errors.title = 'Title field is required';
  }

  if (validator.isEmpty(company)) {
    errors.company = 'Company field is required';
  }

  if (validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
