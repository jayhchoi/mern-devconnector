import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PostForm from './PostForm';
import _ from 'lodash';

import {
  getPosts,
  deletePost,
  addLike,
  removeLike
} from '../../actions/post.action';
import { Spinner } from '../../components';
import Post from './Post';

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts();
  }

  renderPosts = () => {
    const {
      posts,
      isFetching,
      auth,
      deletePost,
      addLike,
      removeLike
    } = this.props;

    if (isFetching) {
      return <Spinner />;
    } else {
      if (_.isEmpty(posts)) {
        return <p className="lead">There's no post</p>;
      } else {
        return posts.map(post => (
          <Post
            key={post._id}
            post={post}
            auth={auth}
            deletePostAction={deletePost}
            addLikeAction={addLike}
            removeLikeAction={removeLike}
          />
        ));
      }
    }
  };

  render() {
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {this.renderPosts()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    posts: Object.values(state.post.posts),
    isFetching: state.post.isFetching,
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getPosts,
    deletePost,
    addLike,
    removeLike
  }
)(Posts);
