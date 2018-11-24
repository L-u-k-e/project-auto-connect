import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  active: false,
  multiline: false,
  text: '',
  timeout: 3000
};

const subReducers = {
  [actionTypes.SHOW_APP_NOTIFICATION]: show,
  [actionTypes.RESET_APP_NOTIFICATION_STATE]: reset,
};

export default createReducer(initialState, subReducers);





function show(state, action) {
  return { ...state, ...action.payload, active: true };
}





function reset() {
  return initialState;
}
