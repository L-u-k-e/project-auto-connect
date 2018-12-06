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
      activeCallStatusEvents: {
        [sid]: {
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
  setQueueStatus,
  findClientByAccessCode,
};





function registerNewAppClient({ socket }) {
  const client = {
    socket,
    clientID: uuidV4(),
    accessCode: generateNewAccessCode(),
    queueStatus: queueStates.DISCONNECTED,
    activeCallStatusEvents: {}
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





function registerActiveTwilioCall({ twilioSid, clientID, statusCallbacks }) {
  registry[clientID].activeCallStatusEvents[twilioSid] = statusCallbacks;
}




function deregisterActiveTwilioCall({ twilioSid }) {
  const client = findClientByActiveTwilioCallSid(twilioSid);
  delete client.activeCallStatusEvents[twilioSid];
}





function setQueueStatus({ accessCode, queueStatus }) {
  const client = findClientByAccessCode(accessCode);
  client.queueStatus = queueStatus;
  const { socket } = client;
  socketEmitters.notifyClient({ socket, id: 'QUEUE-STATUS', body: queueStatus });
}





function findClientByActiveTwilioCallSid(twilioSid) {
  return Ramda.pipe(
    Ramda.values,
    Ramda.find(
      Ramda.pipe(
        Ramda.prop('activeCallStatusEvents'),
        Ramda.keys,
        Ramda.contains(twilioSid)
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
