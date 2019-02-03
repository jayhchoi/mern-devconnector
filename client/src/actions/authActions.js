import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { SET_CURRENT_USER, GET_ERRORS } from './types';
import setAuthToken from '../utils/setAuthToken';

export const registerUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/register', values);
    console.log(res);
    history.push('/login');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

export const loginUser = (values, history) => async dispatch => {
  try {
    const res = await axios.post('/api/users/login', values);
    const { token } = res.data;

    localStorage.setItem('jwt', token);
    setAuthToken(token); // Set http header

    const decoded = jwtDecode(token);

    dispatch(setCurrentUser(decoded));

    history.push('/');
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
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
