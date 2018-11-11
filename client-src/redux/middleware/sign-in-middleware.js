import * as actionTypes from 'redux/action-types';
import * as Ramda from 'ramda';
import { sendAPIRequest, signInCompletionSuccessful } from 'redux/action-creators';
import uuidV4 from 'uuid/v4';




let signInCompletionRequestInProgressID = null;
const actionHandlers = {
  [actionTypes.COMPLETE_SIGN_IN]: signIn,
  [actionTypes.RECEIVED_API_REPLIES]: handleReceivedAPIReplies,
};





export default function signInMiddleware(store) {
  return next => action => {
    if (actionHandlers[action.type]) {
      actionHandlers[action.type](store, action, next);
    } else {
      next(action);
    }
  };
}





function signIn(store, action, next) {
  next(action);
  signInCompletionRequestInProgressID = uuidV4();
  const googleUser = action.payload;
  const requestDefinition = {
    method: 'validate_id_token',
    id: signInCompletionRequestInProgressID,
    params: {
      id_token: googleUser.getAuthResponse().id_token
    }
  };
  next(sendAPIRequest(requestDefinition));
}





function handleReceivedAPIReplies(store, action, next) {
  next(action);
  const replies = action.payload;
  const successfulSignInCompletionReply = Ramda.find(
    reply => signInCompletionRequestInProgressID && reply.id === signInCompletionRequestInProgressID,
    replies,
  );
  if (successfulSignInCompletionReply) {
    next(signInCompletionSuccessful());
    signInCompletionRequestInProgressID = null;
  }
}
