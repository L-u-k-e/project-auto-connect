import uuidV4 from 'uuid/v4';
import io from 'socket.io-client';
import {
  receivedAPIReplies,
  sentAPIRequest,
  socketConnected,
  socketReconnected,
  socketDisconnected,
} from 'redux/action-creators';
import * as actionTypes from 'redux/action-types';





const actionHandlers = {
  [actionTypes.SEND_API_REQUEST]: sendAPIRequest,
};



const responseBufferWaitTimeMs = 100;
let replyBuffer = [];
let storeReference;





export default function socketMiddleware(store) {
  storeReference = store;
  return next => action => {
    if (!action) return;
    if (actionHandlers[action.type]) {
      actionHandlers[action.type](store, action, next);
    } else {
      next(action);
    }
  };
}





function sendAPIRequest(store, action, next) {
  next(action);
  const { method, params, id } = action.payload;
  emitApiRequest({
    next,
    method,
    id,
    params,
    triggeringAction: action,
  });
}





let globalSocket = null;
function emitApiRequest({ next, method, params, id = uuidV4(), triggeringAction }) {
  const request = { method, params, id, jsonrpc: '2.0' };
  if (globalSocket) {
    emit();
    next(sentAPIRequest({ request, triggeringAction }));
  } else {
    globalSocket = io('/', { transports: ['websocket'] }); // no need for polling fallback
    globalSocket.on('connect', handleConnect);
    globalSocket.on('notification', handleReply);
    globalSocket.on('reply', handleReply);
    globalSocket.on('disconnect', handleDisconnect);
    globalSocket.on('reconnect', handleReconnect);
  }

  function handleReply(reply) {
    replyBuffer.push(reply);
  }

  function emit() {
    globalSocket.emit('request', request);
  }

  function handleConnect() {
    next(socketConnected());
    emit();
    next(sentAPIRequest({ request, triggeringAction }));
  }

  function handleReconnect() {
    next(socketReconnected());
  }

  function handleDisconnect() {
    next(socketDisconnected(false));
  }
}





setInterval(() => {
  if (!replyBuffer.length) return;
  storeReference.dispatch(receivedAPIReplies(replyBuffer));
  replyBuffer = [];
}, responseBufferWaitTimeMs);
