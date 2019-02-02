import React from 'react';
import { Field } from 'redux-form';

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

export default CustomField;
