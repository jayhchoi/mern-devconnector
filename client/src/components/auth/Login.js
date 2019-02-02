import React, { Component } from 'react';
import { reduxForm } from 'redux-form';

import CustomField from '../CustomField';
import loginFormFields from './loginFormFields';

class Login extends Component {
  state = {
    errors: {}
  };

  onSubmit = values => {
    console.log(values);
  };

  renderFields = () => {
    const { errors } = this.state;

    return loginFormFields.map(field => (
      <CustomField {...field} errors={errors} />
    ));
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
                {this.renderFields()}
                <button type="submit" className="btn btn-info btn-block mt-4">
                  Confirm
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'loginForm'
})(Login);
