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
    type: actionTypes.SENT_API_REQUESTS,
  };
}

export function receivedAPIReplies(payload) {
  return {
    payload,
    type: actionTypes.RECEIVED_API_REPLIES,
  };
}
