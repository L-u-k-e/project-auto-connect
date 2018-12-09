import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  active: false
};

const subReducers = {
  [actionTypes.ACTIVATE_CALL_INITIATION_DIALOG]: activate,
  [actionTypes.DEACTIVATE_CALL_INITIATION_DIALOG]: deactivate,
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
