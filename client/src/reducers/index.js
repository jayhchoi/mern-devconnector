import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import errorsReducer from './errorsReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  errors: errorsReducer
});
