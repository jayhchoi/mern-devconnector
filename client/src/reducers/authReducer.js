import { SET_CURRENT_USER } from '../actions/types';
import jwtDecode from 'jwt-decode';

const initialState = {
  isAuthenticated: false,
  user: {}
};

// Check for local token when refreshed AND keep user logged in
if (localStorage.getItem('jwt')) {
  const user = jwtDecode(localStorage.getItem('jwt'));
  initialState.isAuthenticated = true;
  initialState.user = user;
}

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload.name // False if payload is empty
      };
    default:
      return state;
  }
};
