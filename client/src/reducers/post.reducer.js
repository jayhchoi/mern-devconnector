import _ from 'lodash';
import { CREATE_POST, FETCHING_POSTS, GET_POSTS } from '../actions/types';

const initialState = {
  isFetching: false,
  posts: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_POST:
      return {
        ...state,
        posts: { ...state.posts, [action.payload._id]: action.payload },
        isFetching: false
      };
    case GET_POSTS:
      return {
        ...state,
        posts: { ..._.mapKeys(action.payload, '_id') } // array of objects to object of objects
      };
    case FETCHING_POSTS:
      return {
        ...state,
        isFetching: true
      };
    default:
      return state;
  }
};
