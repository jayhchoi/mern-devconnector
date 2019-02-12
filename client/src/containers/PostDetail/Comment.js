import React from 'react';
import PropTypes from 'prop-types';

const Comment = ({ comment, auth, postId, deleteCommentAction, dispatch }) => {
  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <a href="profile.html">
            <img
              className="rounded-circle d-none d-md-block"
              src={comment.avatar}
              alt=""
            />
          </a>
          <br />
          <p className="text-center">{comment.name}</p>
        </div>
        <div className="col-md-10">
          <p className="lead">{comment.text}</p>
          {comment.user === auth.user._id ? (
            <button
              onClick={() => deleteCommentAction(postId, comment._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              <i className="fas fa-times" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  deleteCommentAction: PropTypes.func.isRequired
};

export default Comment;
