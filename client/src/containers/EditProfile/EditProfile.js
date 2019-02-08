import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { history } from '../../utils';

import { CustomField } from '../../components';
import { profileFields, socialFields } from '../../constants/profileFormFields';
import {
  createProfile,
  getCurrentProfile
} from '../../actions/profiles.action';

class EditProfile extends Component {
  state = {
    displaySocialInputs: true
  };

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onSubmit = values => {
    this.props.createProfile(values, history);
  };

  renderFields() {
    const { errors } = this.props;

    return profileFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  }

  renderSocialFields() {
    const { errors } = this.props;

    return socialFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Back
              </Link>
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <button
                  type="button"
                  className="btn btn-light mb-3"
                  onClick={() =>
                    this.setState({
                      displaySocialInputs: !this.state.displaySocialInputs
                    })
                  }
                >
                  Add Social Network
                </button>
                {this.state.displaySocialInputs
                  ? this.renderSocialFields()
                  : null}

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

EditProfile.propTypes = {
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

EditProfile = reduxForm({
  form: 'profileForm'
})(EditProfile);

const mapStateToProps = state => {
  return {
    errors: state.errors,
    initialValues: state.profiles
  };
};

EditProfile = connect(
  mapStateToProps,
  {
    createProfile,
    getCurrentProfile
  }
)(EditProfile);

export default EditProfile;
