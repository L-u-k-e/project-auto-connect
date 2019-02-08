import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = null;

const subReducers = {
  [actionTypes.LEADS_LOADED]: handleLeadsLoaded,
  [actionTypes.CLEAR_LEADS]: handleClearLeads,
};

export default createReducer(initialState, subReducers);





function handleLeadsLoaded(state, action) {
  const { fieldNames } = action.payload;
  return fieldNames;
}




function handleClearLeads() {
  return initialState;
}
