import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import errorsReducer from './errorsReducer';
import profilesReducer from './profilesReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  errors: errorsReducer,
  profiles: profilesReducer
});
