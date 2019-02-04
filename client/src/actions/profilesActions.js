import axios from 'axios';
import { GET_PROFILE, GET_ERRORS } from './types';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile');
    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    dispatch({
      type: GET_PROFILE,
      payload: {}
    });
  }
};
