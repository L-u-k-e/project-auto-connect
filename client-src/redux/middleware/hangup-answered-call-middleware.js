import * as actionTypes from 'redux/action-types';
import {
  sendAPIRequest,
} from 'redux/action-creators';
import {
  getUserIDToken,
  getAnsweredCallInProgressCallID,
} from '../selectors';





const actionHandlers = {
  [actionTypes.HANGUP_ANSWERED_CALL]: hangupAnsweredCall,
  // [actionTypes.RECEIVED_API_REPLIES]: handleReceivedAPIReplies,
};





export default function hangupAnsweredCallMiddleware(store) {
  return next => action => {
    if (actionHandlers[action.type]) {
      actionHandlers[action.type](store, action, next);
    } else {
      next(action);
    }
  };
}





function hangupAnsweredCall(store, action, next) {
  next(action);
  const state = store.getState();
  const answeredCallID = getAnsweredCallInProgressCallID(state);
  const requestDefinition = {
    method: 'end_call',
    params: {
      id_token: getUserIDToken(state),
      call_id: answeredCallID
    }
  };
  next(sendAPIRequest(requestDefinition));
}
