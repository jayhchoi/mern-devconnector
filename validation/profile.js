const validator = require('validator');

module.exports = validateProfileInput = data => {
  let errors = {};

  const { handle = '', status = '', skills = '' } = data;

  if (!validator.isLength(handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to be between 2 and 40 chars';
  }

  if (validator.isEmpty(handle)) {
    errors.handle = 'Handle field is required';
  }

  if (validator.isEmpty(status)) {
    errors.status = 'Status field is required';
  }

  if (validator.isEmpty(skills)) {
    errors.skills = 'Skills field is required';
  }

  if (data.website) {
    if (!validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
