import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { CustomField } from '../../components';
import { addComment } from '../../actions/post.action';

class CommentForm extends Component {
  onSubmit = values => {
    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: values.text,
      name: user.name,
      avatar: user.avatar
      // user: user._id
    };

    this.props.addComment(postId, newComment);
  };

  render() {
    const { errors, handleSubmit } = this.props;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form noValidate onSubmit={handleSubmit(this.onSubmit)}>
              <CustomField
                type="text"
                component="textarea"
                name="text"
                placeholder="Add a comment"
                errors={errors}
              />
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

CommentForm.propTypes = {
  errors: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addComment: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired
};

CommentForm = reduxForm({
  form: 'commentForm'
})(CommentForm);

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

CommentForm = connect(
  mapStateToProps,
  {
    addComment
  }
)(CommentForm);

export default CommentForm;
