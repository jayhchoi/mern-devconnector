const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

// @route GET api/posts/test
// @desc  Tests posts route
// @access  Public
router.get('/test', (req, res) => res.send({ msg: 'Posts routes works' }));

// @route GET api/posts
// @desc  Fetch posts
// @access  Public
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({}).sort({ _id: -1 });
    res.send(posts);
  } catch (err) {
    res.status(404).send({ post: err.message });
  }
});

// @route GET api/posts/:id
// @desc  Fetch post by id
// @access  Public
router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const post = await Post.findById(id); // This returns null when found nothing
    if (!post) throw Error('Post not found by the ID');
    res.send(post);
  } catch (err) {
    res.status(404).send({ post: err.message });
  }
});

// @route POST api/posts
// @desc  Create post
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    const newPost = new Post(req.body);
    newPost.user = req.user._id;

    try {
      const post = await newPost.save();
      res.send(post);
    } catch (err) {
      res.status(400).send({ post: err.message });
    }
  }
);

// @route DELETE api/posts/:id
// @desc  Delete post
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error('Post not found by the ID');
      // Check for owner
      if (post.user.toString() !== req.user._id.toString())
        throw Error('User not authorized');
      // Delete
      await post.remove();
      res.send();
    } catch (err) {
      res.status(400).send({ post: err.message });
    }
  }
);

// @route POST api/posts/like/:id
// @desc  Like post
// @access  Private
router.post(
  '/like/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error('Post not found by the ID');
      // Check if already liked
      if (
        post.likes.filter(
          like => like.user.toString() === req.user._id.toString()
        ).length > 0
      )
        throw new Error('User already liked this post');

      // Add user id to likes array
      post.likes.unshift({ user: req.user._id });
      const updatedPost = await post.save();
      res.send(updatedPost);
    } catch (err) {
      res.status(400).send({ like: err.message });
    }
  }
);

// @route POST api/posts/unlike/:id
// @desc  Unlike post
// @access  Private
router.post(
  '/unlike/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error('Post not found by the ID');
      // Check if liked in past
      if (
        post.likes.filter(
          like => like.user.toString() === req.user._id.toString()
        ).length === 0
      )
        throw Error('Never liked the post');

      // Remove like from post.likes
      const removeIndex = post.likes
        .map(like => like.user.toString())
        .indexOf(req.user._id.toString());
      post.likes.splice(removeIndex, 1);

      const updatedPost = await post.save();
      res.send(updatedPost);
    } catch (err) {
      res.status(400).send({ unlike: err.message });
    }
  }
);

// @route POST api/posts/comment/:id
// @desc  Add comment to post
// @access  Private
router.post(
  '/comment/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).send(errors);
    }

    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error('Post not found by the ID');

      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user._id
      };

      post.comments.unshift(newComment);
      const updatedPost = await post.save();
      res.send(updatedPost);
    } catch (err) {
      res.status(400).send({ comment: err.message });
    }
  }
);

// @route DELETE api/posts/comment/:id/:comment_id
// @desc  Delete comment to post
// @access  Private
router.delete(
  '/comment/:id/:comment_id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      if (!post) throw Error('Post not found by the ID');

      // Check for comment
      const comment = post.comments.filter(
        comment => comment._id.toString() === req.params.comment_id.toString()
      );
      if (comment.length === 0) throw Error('Comment not found');

      // // Check owner of comment
      if (comment[0].user.toString() !== req.user._id.toString())
        throw Error('User not authorized');

      // Remove comment
      const removeIndex = post.comments
        .map(comment => comment._id.toString())
        .indexOf(req.params.comment_id.toString());

      post.comments.splice(removeIndex, 1);

      const updatedPost = await post.save();
      res.send(updatedPost);
    } catch (err) {
      res.status(400).send({ comment: err.message });
    }
  }
);

module.exports = router;
