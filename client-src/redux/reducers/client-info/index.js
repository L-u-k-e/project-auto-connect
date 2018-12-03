import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  accessCode: null,
  clientID: null,
};

const subReducers = {
  [actionTypes.SIGN_IN_COMPLETION_SUCCESSFUL]: update,
};

export default createReducer(initialState, subReducers);





function update(state, action) {
  const { accessCode, clientID } = action.payload;
  return { accessCode, clientID };
}
