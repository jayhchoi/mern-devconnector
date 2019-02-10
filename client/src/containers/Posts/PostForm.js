import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { CustomField } from '../../components';
import { createPost } from '../../actions/post.action';

class PostForm extends Component {
  onSubmit = values => {
    const { user } = this.props.auth;

    const newPost = {
      text: values.text,
      name: user.name,
      avatar: user.avatar
    };

    this.props.createPost(newPost);
  };

  render() {
    const { errors, handleSubmit } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
              <div className="form-group">
                <CustomField
                  type="text"
                  component="textarea"
                  name="text"
                  placeholder="Create a post"
                  errors={errors}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  createPost: PropTypes.func.isRequired
};

PostForm = reduxForm({
  form: 'postForm'
})(PostForm);

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

PostForm = connect(
  mapStateToProps,
  {
    createPost
  }
)(PostForm);

export default PostForm;
