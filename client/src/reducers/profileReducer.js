import _ from 'lodash';

import {
  GET_PROFILE,
  GET_PROFILES,
  FETCHING_PROFILES,
  CLEAR_PROFILES
} from '../actions/types';

const initialState = {
  isFetching: false,
  profiles: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE:
      return {
        ...state,
        profiles: _.isEmpty(action.payload)
          ? {}
          : { [action.payload._id]: action.payload }, // single profile
        isFetching: false
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: { ..._.mapKeys(action.payload, '_id') },
        isFetching: false
      };
    case FETCHING_PROFILES:
      return { ...state, isFetching: true };
    case CLEAR_PROFILES:
      return state;
    default:
      return state;
  }
};
