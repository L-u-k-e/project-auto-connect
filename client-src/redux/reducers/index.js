import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createResponsiveStateReducer } from 'redux-responsive';
import breakpoints from 'libraries/breakpoints';
import appNotificationReducer from './app-notification';
import signInStatusReducer from './sign-in-status';
import callParametersReducer from './call-parameters';
import leadsReducer from './leads';
import leadsListFieldNamesReducer from './leads-list-field-names';
import leadsLoadingStatusReducer from './leads-loading-status';
import navDrawerReducer from './nav-drawer';



export default combineReducers({
  browser: createResponsiveStateReducer(breakpoints, {
    extraFields: () => ({
      width: window.innerWidth,
      height: window.innerHeight
    })
  }),
  form: formReducer,
  appNotification: appNotificationReducer,
  callParameters: callParametersReducer,
  leads: leadsReducer,
  leadsListFieldNames: leadsListFieldNamesReducer,
  leadsLoadingStatus: leadsLoadingStatusReducer,
  navDrawer: navDrawerReducer,
  signInStatus: signInStatusReducer,
});
