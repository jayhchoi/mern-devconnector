import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getPost, deleteComment } from '../../actions/post.action';
import { Spinner } from '../../components';

import Comment from './Comment';
import CommentForm from './CommentForm';

class PostDetail extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  renderPost = () => {
    const { post } = this.props;

    return (
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
          </div>
        </div>
      </div>
    );
  };

  renderComments = () => {
    const { comments, _id } = this.props.post;
    const { auth, deleteComment } = this.props;

    if (comments.length > 0) {
      return (
        <div className="comments">
          {comments.map(comment => (
            <Comment
              key={comment._id}
              comment={comment}
              postId={_id}
              auth={auth}
              deleteCommentAction={deleteComment}
            />
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const { post, isFetching } = this.props;

    return (
      <div className="post">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {isFetching || _.isEmpty(post) ? (
                <Spinner />
              ) : (
                <Fragment>
                  {this.renderPost()}
                  <CommentForm postId={post._id} />
                  {this.renderComments()}
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object,
  auth: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
  return {
    post: state.post.posts[ownProps.match.params.id],
    isFetching: state.post.isFetching,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getPost,
    deleteComment
  }
)(PostDetail);
