import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  loadingInProgress: false,
  loadingError: null,
};

const subReducers = {
  [actionTypes.LOAD_LEADS]: loadLeads,
  [actionTypes.SET_LEADS_LOADING_ERROR]: setLeadsLoadingError,
  [actionTypes.LEADS_LOADED]: leadsLoaded,
};

export default createReducer(initialState, subReducers);





function loadLeads(state) {
  const nextState = { ...state };
  nextState.loadingInProgress = true;
  nextState.loadingError = null;
  return nextState;
}





function setLeadsLoadingError(state, action) {
  const nextState = { ...state };
  const { message } = action.payload;
  nextState.loadingInProgress = false;
  nextState.loadingError = message;
}





function leadsLoaded() {
  const nextState = { ...initialState };
  return nextState;
}
