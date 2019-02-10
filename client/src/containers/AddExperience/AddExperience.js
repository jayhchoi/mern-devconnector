import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';

import { addExperience } from '../../actions/profiles.action';
import { experienceFields } from '../../constants/profileFormFields';

import { history } from '../../utils';
import { CustomField } from '../../components';

class AddExperience extends Component {
  onSubmit = values => {
    this.props.addExperience(values, history);
  };

  renderFields() {
    const { errors } = this.props;

    return experienceFields.map(field => (
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
              <h1 className="display-4 text-center">Add Experience</h1>
              <p className="lead text-center">
                Add any job or position that you've had
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

AddExperience.proptypes = {
  errors: PropTypes.object.isRequired,
  addExperience: PropTypes.func.isRequired
};

AddExperience = reduxForm({
  form: 'experienceForm',
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
})(AddExperience);

const mapStateToProps = state => {
  return {
    errors: state.errors
  };
};

AddExperience = connect(
  mapStateToProps,
  {
    addExperience
  }
)(AddExperience);

export default AddExperience;
