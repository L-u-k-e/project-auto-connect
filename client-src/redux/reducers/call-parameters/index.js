import * as Ramda from 'ramda';
import createReducer from 'libraries/create-reducer';
import * as actionTypes from 'redux/action-types';





const initialState = {
  maxConcurrentCalls: 5,
  leadsIndexCursor: 0,
  leadCallsInProgressInfo: [],
  callingLeads: false,
  answeredCallInProgressCorrelationID: null,
};

const subReducers = {
  [actionTypes.CALL_LEADS]: handleCallLeads,
  [actionTypes.STOP_CALLING_LEADS]: handleStopCallingLeads,
  [actionTypes.CALL_ANSWERED]: handleCallAnswered,
  [actionTypes.ANSWERED_CALL_COMPLETED]: handleAnsweredCallCompleted,
  [actionTypes.RESET_LEAD_CALLING_PROGRESS_INFO]: resetCursors,
  [actionTypes.ADD_LEAD_CALL_IN_PROGRESS_INFO]: addLeadCallInProgressInfo,
  [actionTypes.REMOVE_LEAD_CALL_IN_PROGRESS_INFO]: removeLeadCallInProgressInfo,
  [actionTypes.UPDATE_MAX_CONCURRENT_CALLS]: updateMaxConcurrentCalls,
  [actionTypes.UPDATE_LEADS_INDEX_CURSOR]: updateLeadsIndexCursor,
};

export default createReducer(initialState, subReducers);





function handleCallLeads(state) {
  const nextState = { ...state };
  nextState.callingLeads = true;
  return nextState;
}




function handleStopCallingLeads(state) {
  const nextState = { ...state };
  nextState.callingLeads = false;
  return nextState;
}





function addLeadCallInProgressInfo(state, action) {
  const { correlationID, cursor } = action.payload;
  const nextState = { ...state };
  nextState.leadCallsInProgressInfo = [...nextState.leadCallsInProgressInfo, { correlationID, cursor }];
  return nextState;
}





function removeLeadCallInProgressInfo(state, action) {
  const { correlationID = null, cursor = null } = action.payload;
  const nextState = { ...state };
  const indexToRemove = Ramda.findIndex(
    callInfo => callInfo.correlationID === correlationID || callInfo.cursor === cursor,
    nextState.leadCallsInProgressInfo
  );
  nextState.leadCallsInProgressInfo = Ramda.remove(indexToRemove, 1, nextState.leadCallsInProgressInfo);
  return nextState;
}





function updateMaxConcurrentCalls(state, action) {
  const { value } = action.payload;
  const nextState = { ...state };
  nextState.maxConcurrentCalls = value;
  return nextState;
}





function updateLeadsIndexCursor(state, action) {
  const { value } = action.payload;
  const nextState = { ...state };
  nextState.leadsIndexCursor = value;
  return nextState;
}





function handleCallAnswered(state, action) {
  const { correlationID } = action.payload;
  const nextState = { ...state };
  nextState.answeredCallInProgressCorrelationID = correlationID;
  nextState.callingLeads = false;
  return nextState;
}





function handleAnsweredCallCompleted(state) {
  const nextState = { ...state };
  nextState.callingLeads = true;
  nextState.answeredCallInProgressCorrelationID = null;
  return nextState;
}





function resetCursors(state) {
  const nextState = { ...state };
  nextState.leadsIndexCursor = 0;
  nextState.leadCallsInProgressInfo = [];
  return nextState;
}
