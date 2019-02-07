import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import CustomField from '../../components/CustomField';
import registerFormFields from './registerFormFields';

import { registerUser } from '../../actions/auth.action';
import { unsetErrors } from '../../actions/errors.action';

class Register extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillUnmount() {
    this.props.unsetErrors();
  }

  onSubmit = values => {
    this.props.registerUser(values, this.props.history);
  };

  renderFields = () => {
    const { errors } = this.props;

    return registerFormFields.map(field => (
      <CustomField key={field.name} {...field} errors={errors} />
    ));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="register">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Sign Up</h1>
                <p className="lead text-center">
                  Create your DevConnector account
                </p>
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
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  unsetErrors: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

Register = connect(
  mapStateToProps,
  {
    registerUser,
    unsetErrors
  }
)(withRouter(Register));

export default reduxForm({
  form: 'registerForm'
})(Register);
