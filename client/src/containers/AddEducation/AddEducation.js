import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { addEducation } from '../../actions/profiles.action';
import { educationFields } from '../../constants/profileFormFields';

import { history } from '../../utils';
import { CustomField } from '../../components';

class AddEducation extends Component {
  onSubmit = values => {
    this.props.addEducation(values, history);
  };

  renderFields() {
    const { errors } = this.props;

    return educationFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="add-experience">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back
              </Link>
              <h1 className="display-4 text-center">Add Education</h1>
              <p className="lead text-center">
                Add any school, bootcamp, etc that you've attended
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <button type="submit" className="btn btn-info btn-block mt-4">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddEducation.proptypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  addEducation: PropTypes.func.isRequired
};

AddEducation = reduxForm({
  form: 'educationForm',
  onChange: ({ current }, dispatch, props) => {
    if (current === true) {
      // Clear 'to' field if 'current' is set to TRUE
      dispatch(props.change('to', ''));
      // Disable 'to' field
      document.getElementsByName('to')[0].setAttribute('disabled', 'true');
    } else {
      // Enable 'to' field
      document.getElementsByName('to')[0].removeAttribute('disabled');
    }
  }
})(AddEducation);

const mapStateToProps = state => {
  return {
    profile: state.profiles,
    errors: state.errors
  };
};

AddEducation = connect(
  mapStateToProps,
  {
    addEducation
  }
)(AddEducation);

export default AddEducation;
