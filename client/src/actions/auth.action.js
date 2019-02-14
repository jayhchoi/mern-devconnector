import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, SET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (values, history) => async dispatch => {
  try {
    await axios.post('/api/users/register', values);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', values); // values: email & password
    const { token } = res.data;

    localStorage.setItem('jwt', token);
    setAuthToken(token); // Set http header

    const decoded = jwtDecode(token); // decoded = { _id, name, avatar, email }
    dispatch(setCurrentUser(decoded));

    history.push('/dashboard');
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const logoutUser = () => {
  setAuthToken(false); // remove auth header
  localStorage.removeItem('jwt');

  // set authenticated to false and user empty
  return setCurrentUser(false);
};

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    payload: user
  };
};
