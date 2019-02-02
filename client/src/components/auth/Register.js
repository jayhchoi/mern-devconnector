import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class Register extends Component {
  onSubmit = values => {
    console.log(values);
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
                <form onSubmit={handleSubmit(this.onSubmit)}>
                  <div className="form-group">
                    <Field
                      component="input"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className="form-control form-control-lg"
                    />
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email Address"
                      name="email"
                    />
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
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
                  <div className="form-group">
                    <Field
                      component="input"
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Confirm Password"
                      name="password2"
                    />
                  </div>
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

export default reduxForm({
  form: 'registerForm'
})(Register);
