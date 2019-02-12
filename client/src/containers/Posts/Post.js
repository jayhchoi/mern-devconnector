import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const userLikedThis = (likes, user) => {
  if (likes.filter(like => like.user === user._id).length > 0) {
    return true;
  } else {
    return false;
  }
};

const Post = ({
  post,
  auth,
  deletePostAction,
  addLikeAction,
  removeLikeAction
}) => {
  return (
    <div className="posts">
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <button
              onClick={() => addLikeAction(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i
                className={`${
                  userLikedThis(post.likes, auth.user) ? 'text-info' : null
                } fas fa-thumbs-up`}
              />
              <span className="badge badge-light">{post.likes.length}</span>
            </button>
            <button
              onClick={() => removeLikeAction(post._id)}
              type="button"
              className="btn btn-light mr-1"
            >
              <i className="text-secondary fas fa-thumbs-down" />
            </button>
            <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
              Comments
            </Link>
            {post.user === auth.user._id ? (
              <button
                onClick={() => deletePostAction(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePostAction: PropTypes.func.isRequired,
  addLikeAction: PropTypes.func.isRequired,
  removeLikeAction: PropTypes.func.isRequired
};

export default Post;
