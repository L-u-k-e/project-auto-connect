import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createResponsiveStateReducer } from 'redux-responsive';
import breakpoints from 'libraries/breakpoints';
import signInStatusReducer from './sign-in-status';
import leadsReducer from './leads';
import leadsListFieldNamesReducer from './leads-list-field-names';
import leadsLoadingStatusReducer from './leads-loading-status';



export default combineReducers({
  browser: createResponsiveStateReducer(breakpoints, {
    extraFields: () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }),
  form: formReducer,
  leads: leadsReducer,
  leadsListFieldNames: leadsListFieldNamesReducer,
  leadsLoadingStatus: leadsLoadingStatusReducer,
  signInStatus: signInStatusReducer,
});
