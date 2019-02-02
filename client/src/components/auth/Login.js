import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Login extends Component {
  onSubmit = values => {
    console.log(values);
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
              <form onSubmit={handleSubmit(this.onSubmit)}>
                <div className="form-group">
                  <Field
                    component="input"
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email Address"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <Field
                    component="input"
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Password"
                    name="password"
                  />
                </div>
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
