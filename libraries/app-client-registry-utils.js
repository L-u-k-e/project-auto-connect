const Ramda = require('ramda');
const uuidV4 = require('uuid/v4');
const queueStates = require('./queue-states');
const { generateRandomInt } = require('./misc-utils');
const socketEmitters = require('./socket-emitters');





/*
  {
    [clientID]: {
      clientID,
      accessCode,
      queueStatus,
      answeredCallSid,
      consumerCallSid,
      statusCallbacks: {
        [callSid]: {
          onAnswered: func,
          ...
          ...
        }
      }
    }
  }
*/
const registry = {};
module.exports = {
  registerNewAppClient,
  isAccessCodeInUse,
  registerActiveTwilioCall,
  deregisterActiveTwilioCall,
  isClientOnAnotherCall,
  isClientOnACall,
  onCallBridge,
  onBridgedCallDisconnect,
  onCallStatusEvent,
  onQueueConsumerConnect,
  onQueueConsumerDisconnect,
  getClientAccessCodeByActiveTwilioCallSid,
  isConsumerConnectedToAQueue,
  getClientAccessCodeByConsumerTwilioCallSid
};





function registerNewAppClient({ socket }) {
  const client = {
    socket,
    id: uuidV4(),
    accessCode: generateNewAccessCode(),
    queueStatus: queueStates.DISCONNECTED,
    answeredCallSid: null,
    consumerCallSid: null,
    statusCallbacks: {}
  };
  registry[client.id] = client;
  return client;
}





function generateNewAccessCode() {
  let accessCode;
  while (!accessCode) {
    const randomInt = generateRandomInt(0, 999999);
    if (!isAccessCodeInUse(randomInt)) {
      accessCode = randomInt;
    }
  }
  return accessCode.toString();
}





function isAccessCodeInUse(accessCode) {
  const takenAccessCodes = Ramda.pipe(
    Ramda.values,
    Ramda.map(Ramda.prop('accessCode'))
  )(registry);
  return Ramda.contains(accessCode, takenAccessCodes);
}





function registerActiveTwilioCall({ callSid, clientID, statusCallbacks }) {
  // console.log(JSON.stringify(registry, null, 2));
  registry[clientID].statusCallbacks[callSid] = statusCallbacks;
}




function deregisterActiveTwilioCall({ twilioSid }) {
  const client = findClientByActiveTwilioCallSid(twilioSid);
  delete client.statusCallbacks[twilioSid];
}





function onQueueConsumerConnect({ accessCode, consumerCallSid }) {
  const client = findClientByAccessCode(accessCode);
  client.queueStatus = queueStates.CONNECTED;
  client.consumerCallSid = consumerCallSid;
  const { socket } = client;
  socketEmitters.notifyClient({ socket, id: 'QUEUE-STATUS', body: client.queueStatus });
}





function onQueueConsumerDisconnect({ consumerCallSid }) {
  const client = findClientByConsumerCallSid(consumerCallSid);
  client.queueStatus = queueStates.DISCONNECTED;
  client.consumerCallSid = null;
  const { socket } = client;
  socketEmitters.notifyClient({ socket, id: 'QUEUE-STATUS', body: client.queueStatus });
}





function isClientOnAnotherCall(callSid) {
  const client = findClientByActiveTwilioCallSid(callSid);
  console.log(client.answeredCallSid);
  return (!!client.answeredCallSid && client.answeredCallSid !== callSid);
}





function isClientOnACall(clientID) {
  return !!registry[clientID].answeredCallSid;
}





function onCallStatusEvent({ callSid, callStatus, req, res }) {
  const client = findClientByActiveTwilioCallSid(callSid);
  const callback = client.statusCallbacks[callSid][callStatus];
  callback({ req, res, callSid, callStatus });
}





function onCallBridge(callSid) {
  const client = findClientByActiveTwilioCallSid(callSid);
  client.answeredCallSid = callSid;
}





function onBridgedCallDisconnect(callSid) {
  const client = findClientByActiveTwilioCallSid(callSid);
  if (callSid === client.answeredCallSid) {
    client.answeredCallSid = null;
  }
}





function findClientByActiveTwilioCallSid(callSid) {
  return Ramda.pipe(
    Ramda.values,
    Ramda.find(
      Ramda.pipe(
        Ramda.prop('statusCallbacks'),
        Ramda.keys,
        Ramda.contains(callSid)
      )
    )
  )(registry);
}





function findClientByAccessCode(accessCode) {
  return Ramda.pipe(
    Ramda.values,
    Ramda.find(Ramda.propEq('accessCode', accessCode))
  )(registry);
}





function findClientByConsumerCallSid(consumerCallSid) {
  return Ramda.pipe(
    Ramda.values,
    Ramda.find(Ramda.propEq('consumerCallSid', consumerCallSid))
  )(registry);
}





function getClientAccessCodeByActiveTwilioCallSid(callSid) {
  const client = findClientByActiveTwilioCallSid(callSid);
  return client && client.accessCode;
}





function isConsumerConnectedToAQueue(consumerCallSid) {
  const client = findClientByConsumerCallSid(consumerCallSid);
  return client && client.queueStatus === queueStates.CONNECTED;
}





function getClientAccessCodeByConsumerTwilioCallSid(consumerCallSid) {
  const client = findClientByConsumerCallSid(consumerCallSid);
  return client && client.accessCode;
}
