import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import axios from 'axios';

import CustomField from '../CustomField';
import registerFormFields from './registerFormFields';

class Register extends Component {
  state = {
    errors: {}
  };

  onSubmit = async values => {
    try {
      const res = await axios.post('/api/users/register', values);
      console.log(res.data);
    } catch (err) {
      this.setState({ errors: err.response.data });
    }
  };

  renderFields = () => {
    const { errors } = this.state;

    return registerFormFields.map(field => (
      <CustomField {...field} errors={errors} />
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
                  {/* <div className="form-group">
                    <Field
                      component="input"
                      type="text"
                      name="name"
                      placeholder="Enter your name"
                      className={`form-control form-control-lg ${
                        errors.name ? 'is-invalid' : ''
                      }`}
                    />
                    <div className="invalid-feedback">{errors.name}</div>
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      type="email"
                      className={`form-control form-control-lg ${
                        errors.email ? 'is-invalid' : ''
                      }`}
                      placeholder="Email Address"
                      name="email"
                    />
                    <div className="invalid-feedback">{errors.email}</div>
                    <small className="form-text text-muted">
                      This site uses Gravatar so if you want a profile image,
                      use a Gravatar email
                    </small>
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      type="password"
                      className={`form-control form-control-lg ${
                        errors.password ? 'is-invalid' : ''
                      }`}
                      placeholder="Password"
                      name="password"
                    />
                    <div className="invalid-feedback">{errors.password}</div>
                  </div>
                  <div className="form-group">
                    <Field
                      component="input"
                      type="password"
                      className={`form-control form-control-lg ${
                        errors.password2 ? 'is-invalid' : ''
                      }`}
                      placeholder="Confirm Password"
                      name="password2"
                    />
                    <div className="invalid-feedback">{errors.password2}</div>
                  </div> */}
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
