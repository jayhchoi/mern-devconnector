import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './auth.reducer';
import errorsReducer from './errors.reducer';
import profileReducer from './profile.reducer';
import postReducer from './post.reducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  errors: errorsReducer,
  profile: profileReducer,
  post: postReducer
});
