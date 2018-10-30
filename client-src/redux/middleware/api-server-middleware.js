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
  [actionTypes.SEND_API_MESSAGE]: sendAPIMessage,
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





function sendAPIMessage(store, action, next) {
  next(action);
  const request = emitApiRequest({
    next,
    method: '',
    params: {},
  });
  next(sentAPIRequest({ request, triggeringAction: action }));
}





let globalSocket = null;
function emitApiRequest({ next, method, params }) {
  if (globalSocket) {
    emit();
  } else {
    globalSocket = io('/', { transports: ['websocket'] }); // no need for polling fallback
    globalSocket.on('connect', handleConnect);
    globalSocket.on('reply', handleReply);
    globalSocket.on('disconnect', handleDisconnect);
    globalSocket.on('reconnect', handleReconnect);
  }

  function handleReply(reply) {
    replyBuffer.push(reply);
  }

  function emit() {
    globalSocket.emit('request', { method, params, id: uuidV4(), jsonrpc: '2.0' });
  }

  function handleConnect() {
    next(socketConnected());
    emit();
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
