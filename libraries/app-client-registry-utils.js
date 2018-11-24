const Ramda = require('ramda');
const uuidV4 = require('uuid/v4');
const { generateRandomInt } = require('./misc-utils');





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
};





function registerNewAppClient() {
  const client = {
    clientID: uuidV4(),
    accessCode: generateNewAccessCode(),
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
  return accessCode;
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

