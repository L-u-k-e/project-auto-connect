import * as actionTypes from 'redux/action-types';
import * as Ramda from 'ramda';
import uuidV4 from 'uuid/v4';
import {
  sendAPIRequest,
  updateLeadsIndexCursor,
  addLeadCallInProgressInfo,
  removeLeadCallInProgressInfo
} from 'redux/action-creators';
import {
  getMaxConcurrentCalls,
  getLeadsIndexCursor,
  getLeads,
  getUserIDToken,
  getLeadCallsInProgressInfo,
} from '../selectors';





const actionHandlers = {
  [actionTypes.CALL_LEADS]: callLeads,
  [actionTypes.RECEIVED_API_REPLIES]: handleReceivedAPIReplies,
};





export default function callLeadsMiddleware(store) {
  return next => action => {
    if (actionHandlers[action.type]) {
      actionHandlers[action.type](store, action, next);
    } else {
      next(action);
    }
  };
}





function callLeads(store, action, next) {
  next(action);
  const state = store.getState();
  const maxConcurrentCalls = getMaxConcurrentCalls(state);
  Ramda.times(() => callNextLead({ store, next }), maxConcurrentCalls);
}


function callNextLead({ store, next }) {
  const state = store.getState();
  const cursor = getLeadsIndexCursor(state);
  const leads = getLeads(state);
  if (cursor >= leads.length) return;
  const lead = leads[cursor];
  const correlationID = uuidV4();
  next(addLeadCallInProgressInfo({ cursor, correlationID }));
  next(updateLeadsIndexCursor(cursor + 1));
  const requestDefinition = {
    method: 'call',
    id: correlationID,
    params: {
      id_token: getUserIDToken(state),
      phone_number: getLeadPhoneNumber(lead),
    }
  };
  next(sendAPIRequest(requestDefinition));
}



function handleReceivedAPIReplies(store, action, next) {
  next(action);
  const state = store.getState();
  const leadCallsInProgressInfo = getLeadCallsInProgressInfo(state);
  const callInProgressCorrelationIDs = Ramda.map(Ramda.prop('correlationID'), leadCallsInProgressInfo);
  const replies = action.payload;
  replies.forEach(processReply);

  function processReply(reply) {
    if (Ramda.contains(reply.id, callInProgressCorrelationIDs)) {
      const { error, result } = reply;
      if (error || result.complete) {
        next(removeLeadCallInProgressInfo({ correlationID: reply.id }));
        if (!error) {
          callNextLead({ store, next });
        }
      }
    }
  }
}


function getLeadPhoneNumber(lead) {
  return lead.phone || lead.Phone;
}
