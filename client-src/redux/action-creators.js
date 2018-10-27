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
