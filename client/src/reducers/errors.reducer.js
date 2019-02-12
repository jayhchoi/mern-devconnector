import { SET_ERRORS, UNSET_ERRORS } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ERRORS:
      return { ...state, ...action.payload };
    case UNSET_ERRORS:
      return {};
    default:
      return state;
  }
};
