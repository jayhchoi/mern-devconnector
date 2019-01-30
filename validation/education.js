const validator = require('validator');

module.exports = validateEducationInput = data => {
  const errors = {};

  const { school = '', degree = '', fieldofstudy = '', from = '' } = data;

  if (validator.isEmpty(school)) {
    errors.school = 'School field is required';
  }

  if (validator.isEmpty(degree)) {
    errors.degree = 'Degree field is required';
  }

  if (validator.isEmpty(fieldofstudy)) {
    errors.fieldofstudy = 'Field of study field is required';
  }

  if (validator.isEmpty(from)) {
    errors.from = 'From field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0 // Empty object
  };
};
