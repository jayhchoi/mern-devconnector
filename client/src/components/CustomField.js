import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const CustomField = ({ component, type, name, placeholder, errors }) => {
  return (
    <div className="form-group">
      <Field
        component={component}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control form-control-lg ${
          errors[name] ? 'is-invalid' : ''
        }`}
      />
      <div className="invalid-feedback">{errors[name]}</div>
    </div>
  );
};

CustomField.propTypes = {
  component: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  errors: PropTypes.object
};

export default CustomField;
