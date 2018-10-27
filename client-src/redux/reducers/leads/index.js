import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = null;

const subReducers = {
  [actionTypes.LEADS_LOADED]: leadsLoaded
};

export default createReducer(initialState, subReducers);





function leadsLoaded(state, action) {
  const { data } = action.payload;
  return data;
}
