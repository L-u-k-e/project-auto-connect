import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { createResponsiveStateReducer } from 'redux-responsive';
import breakpoints from 'libraries/breakpoints';
import appNotificationReducer from './app-notification';
import signInStatusReducer from './sign-in-status';
import callParametersReducer from './call-parameters';
import callInitiationDialogReducer from './call-initiation-dialog';
import clientInfoReducer from './client-info';
import leadsReducer from './leads';
import leadsListFieldNamesReducer from './leads-list-field-names';
import leadsLoadingStatusReducer from './leads-loading-status';
import navDrawerReducer from './nav-drawer';
import settingsAndHelpDialogReducer from './settings-and-help-dialog';
import queueStatus from './queue-status';



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
  callInitiationDialog: callInitiationDialogReducer,
  clientInfo: clientInfoReducer,
  leads: leadsReducer,
  leadsListFieldNames: leadsListFieldNamesReducer,
  leadsLoadingStatus: leadsLoadingStatusReducer,
  navDrawer: navDrawerReducer,
  settingsAndHelpDialog: settingsAndHelpDialogReducer,
  signInStatus: signInStatusReducer,
  queueStatus: queueStatus
});
