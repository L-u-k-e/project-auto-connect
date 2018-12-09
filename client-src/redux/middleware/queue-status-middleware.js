import * as Ramda from 'ramda';
import * as actionTypes from 'redux/action-types';
import { updateQueueStatus } from 'redux/action-creators';





const actionHandlers = {
  [actionTypes.RECEIVED_API_REPLIES]: handleReceivedAPIReplies,
};





export default function leadsUploaderMiddleware(store) {
  return next => action => {
    if (actionHandlers[action.type]) {
      actionHandlers[action.type](store, action, next);
    } else {
      next(action);
    }
  };
}





function handleReceivedAPIReplies(store, action, next) {
  next(action);
  const replies = action.payload;
  const queueStatusUpdate = Ramda.find(Ramda.propEq('id', 'QUEUE-STATUS'), replies);
  if (queueStatusUpdate) {
    store.dispatch(updateQueueStatus(queueStatusUpdate.result.body));
  }
}
