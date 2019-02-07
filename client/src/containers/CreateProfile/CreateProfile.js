import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { CustomField } from '../../components';
import { profileFields, socialFields } from './createProfileFormFields';
import { createProfile } from '../../actions/profiles.action';

class CreateProfile extends Component {
  state = {
    displaySocialInputs: false
  };

  onSubmit = values => {
    this.props.createProfile(values, this.props.history);
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

CreateProfile.propTypes = {
  profile: PropTypes.object,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    profile: state.profiles,
    errors: state.errors
  };
};

CreateProfile = connect(
  mapStateToProps,
  {
    createProfile
  }
)(CreateProfile);

export default reduxForm({
  form: 'profileForm'
})(withRouter(CreateProfile));
