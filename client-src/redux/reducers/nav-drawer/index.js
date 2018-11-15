import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  openInModalMode: false
};

const subReducers = {
  [actionTypes.TOGGLE_NAV_DRAWER]: toggle,
};

export default createReducer(initialState, subReducers);





function toggle(state) {
  const nextState = { ...state };
  nextState.openInModalMode = !nextState.openInModalMode;
  return nextState;
}
