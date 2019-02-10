import axios from 'axios';
import { reset } from 'redux-form';

import {
  CREATE_POST,
  SET_ERRORS,
  UNSET_ERRORS,
  GET_POSTS,
  FETCHING_POSTS,
  CLEAR_POSTS
} from './types';

export const createPost = postData => async dispatch => {
  try {
    const res = await axios.post('/api/posts', postData);
    dispatch({
      type: CREATE_POST,
      payload: res.data
    });
    dispatch(reset('postForm'));
    dispatch({
      type: UNSET_ERRORS
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getPosts = () => async dispatch => {
  dispatch({ type: FETCHING_POSTS });
  try {
    const res = await axios.get('/api/posts');
    dispatch({
      type: GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({
      type: CLEAR_POSTS
    });
  }
};
