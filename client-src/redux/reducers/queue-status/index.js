import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';
import queueStates from '../../../../libraries/queue-states';





const initialState = {
  status: queueStates.DISCONNECTED,
};

const subReducers = {
  [actionTypes.UPDATE_QUEUE_STATUS]: updateQueueStatus,
};

export default createReducer(initialState, subReducers);





function updateQueueStatus(state, action) {
  const nextState = { ...state };
  const status = action.payload;
  nextState.status = status;
  return nextState;
}
