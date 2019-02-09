import React from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';

const CustomField = ({
  component,
  type,
  name,
  placeholder,
  errors,
  options,
  prepend,
  icon,
  label
}) => {
  if (prepend) {
    return (
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
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
  }

  if (type === 'checkbox') {
    return (
      <div className="form-group form-check">
        <Field
          id={name}
          component={component}
          type={type}
          name={name}
          className="form-check-input"
        />
        <label htmlFor={name} className="form-check-label">
          {placeholder}
        </label>
      </div>
    );
  }

  return (
    <div className="form-group">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <Field
        component={component}
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control form-control-lg ${
          errors[name] ? 'is-invalid' : ''
        }`}
      >
        {options
          ? options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))
          : null}
      </Field>
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
