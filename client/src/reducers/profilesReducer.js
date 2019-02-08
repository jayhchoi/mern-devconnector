import _ from 'lodash';

import { GET_PROFILE, GET_PROFILES } from '../actions/types';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return { [action.payload._id]: action.payload };
    case GET_PROFILES:
      return { ..._.mapKeys(action.payload, '_id') };
    default:
      return state;
  }
};
