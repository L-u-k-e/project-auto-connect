import * as actionTypes from './action-types';





export function loadLeads(file) {
  return {
    type: actionTypes.LOAD_LEADS,
    payload: file
  };
}

export function setLeadsLoadingError(errorPayload) {
  return {
    type: actionTypes.SET_LEADS_LOADING_ERROR,
    payload: errorPayload
  };
}

export function leadsLoaded(payload) {
  return {
    payload,
    type: actionTypes.LEADS_LOADED,
  };
}





export function toggleNavDrawer() {
  return {
    type: actionTypes.TOGGLE_NAV_DRAWER,
    payload: null
  };
}





export function startSignIn() {
  return {
    payload: null,
    type: actionTypes.START_SIGN_IN
  };
}

export function stopSignIn() {
  return {
    payload: null,
    type: actionTypes.STOP_SIGN_IN
  };
}

export function completeSignIn(payload) {
  return {
    payload,
    type: actionTypes.COMPLETE_SIGN_IN
  };
}





export function signInCompletionSuccessful(payload) {
  return {
    payload,
    type: actionTypes.SIGN_IN_COMPLETION_SUCCESSFUL,
  };
}





export function callLeads() {
  return {
    type: actionTypes.CALL_LEADS,
    payload: null,
  };
}





export function callAnswered(correlationID) {
  return {
    type: actionTypes.CALL_ANSWERED,
    payload: { correlationID },
  };
}





export function answeredCallCompleted() {
  return {
    type: actionTypes.ANSWERED_CALL_COMPLETED,
    payload: null,
  };
}





export function stopCallingLeads() {
  return {
    type: actionTypes.STOP_CALLING_LEADS,
    payload: null,
  };
}





export function resetLeadCallingProgressInfo() {
  return {
    type: actionTypes.RESET_LEAD_CALLING_PROGRESS_INFO,
    payload: null,
  };
}





export function updateMaxConcurrentCalls(value) {
  return {
    type: actionTypes.UPDATE_MAX_CONCURRENT_CALLS,
    payload: { value },
  };
}





export function updateLeadsIndexCursor(value) {
  return {
    type: actionTypes.UPDATE_LEADS_INDEX_CURSOR,
    payload: { value },
  };
}





export function addLeadCallInProgressInfo({ cursor, correlationID }) {
  return {
    type: actionTypes.ADD_LEAD_CALL_IN_PROGRESS_INFO,
    payload: { cursor, correlationID },
  };
}




export function removeLeadCallInProgressInfo({ cursor, correlationID }) {
  return {
    type: actionTypes.REMOVE_LEAD_CALL_IN_PROGRESS_INFO,
    payload: { cursor, correlationID },
  };
}





export function updateQueueStatus(queueStatus) {
  return {
    type: actionTypes.UPDATE_QUEUE_STATUS,
    payload: queueStatus,
  };
}





// update socket connection state on successful connect or on an error
export function socketConnected() {
  return {
    type: actionTypes.SOCKET_CONNECTED,
    payload: null,
  };
}

export function socketDisconnected() {
  return {
    type: actionTypes.SOCKET_DISCONNECTED,
    payload: null,
  };
}

export function socketReconnected() {
  return {
    type: actionTypes.SOCKET_RECONNECTED,
    payload: null,
  };
}





// The API Server middleware emits these actions when it sends/receives messages
export function sentAPIRequest(payload) {
  return {
    payload,
    type: actionTypes.SENT_API_REQUEST,
  };
}

export function receivedAPIReplies(payload) {
  return {
    payload,
    type: actionTypes.RECEIVED_API_REPLIES,
  };
}

// The API Server middleware listens for this action to send requests
export function sendAPIRequest(payload) {
  return {
    payload,
    type: actionTypes.SEND_API_REQUEST,
  };
}





// Show/ hide the global app snackbar
export function showAppNotification(payload) {
  return {
    type: actionTypes.SHOW_APP_NOTIFICATION,
    payload
  };
}

export function resetAppNotificationState() {
  return {
    type: actionTypes.RESET_APP_NOTIFICATION_STATE,
    payload: null
  };
}





// activate/ deactivate call initiation dialog
export function activateCallInitiationDialog() {
  return {
    type: actionTypes.ACTIVATE_CALL_INITIATION_DIALOG,
    payload: null,
  };
}

export function deactivateCallInitiationDialog() {
  return {
    type: actionTypes.DEACTIVATE_CALL_INITIATION_DIALOG,
    payload: null,
  };
}
