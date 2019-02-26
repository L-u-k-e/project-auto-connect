import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  active: false,
};

const subReducers = {
  [actionTypes.ACTIVATE_SETTINGS_AND_HELP_DIALOG]: activate,
  [actionTypes.DEACTIVATE_SETTINGS_AND_HELP_DIALOG]: deactivate,
};

export default createReducer(initialState, subReducers);





function activate(state) {
  const nextState = { ...state };
  nextState.active = true;
  return nextState;
}





function deactivate(state) {
  const nextState = { ...state };
  nextState.active = false;
  return nextState;
}
