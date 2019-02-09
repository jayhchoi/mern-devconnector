import axios from 'axios';
import {
  GET_PROFILE,
  SET_ERRORS,
  SET_CURRENT_USER,
  GET_PROFILES
} from './types';

export const deleteExperience = exp_id => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/experience/${exp_id}`);
    // history.push('/dashboard');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteEducation = edu_id => async dispatch => {
  try {
    const res = await axios.delete(`api/profile/education/${edu_id}`);
    // history.push('/dashboard');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addExperience = (values, history) => async dispatch => {
  try {
    await axios.post('/api/profile/experience', values);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const addEducation = (values, history) => async dispatch => {
  try {
    await axios.post('/api/profile/education', values);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const getProfileByHandle = handle => async dispatch => {
  try {
    const res = await axios.get(`/api/profile/handle/${handle}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};

export const getProfiles = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/all');
    dispatch({
      type: GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    dispatch({
      type: GET_PROFILES,
      payload: {}
    });
  }
};

export const createProfile = (values, history) => async dispatch => {
  try {
    await axios.post('/api/profile', values);
    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const deleteAccount = history => async dispatch => {
  if (window.confirm('Are you sure?')) {
    try {
      await axios.delete('/api/profile');
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      });
      history.push('/');
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    }
  }
};
