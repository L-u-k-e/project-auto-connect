const { call } = require('../../libraries/twilio-utils');
const { reply } = require('../../libraries/socket-emitters');
const validateIDToken = require('../../libraries/validate-google-sign-in-id-token');


module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
      phone_number: { type: 'string' },
    },
    required: ['id_token', 'phone_number']
  }
};



async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function fulfillRequest({ socket, request }) {
  const { params: { id_token: idToken, client_id: clientID, phone_number: phoneNumber } } = request;
  await validateIDToken(idToken);
  reply({ socket, request, body: { status: 'calling' }, complete: false });
  const formattedPhoneNumber = formatPhoneNumber({ phoneNumber });
  await call({
    clientID,
    phoneNumber: formattedPhoneNumber,
    statusCallbacks: {
      queued: null,
      initiated: null,
      ringing: null,
      answered: onAnswered,
      completed: onCompleted,
    }
  });


  /*
  const onAnsweredTimeout = getRandomInt(1000, 7000);
  const onCompletedTimeout = onAnsweredTimeout + 300;
  setTimeout(onAnswered, onAnsweredTimeout);
  setTimeout(onCompleted, onCompletedTimeout);
  */

  function onAnswered() { // eslint-disable-line
    reply({ socket, request, body: { status: 'answered' }, complete: false });
  }

  function onCompleted() { // eslint-disable-line
    reply({ socket, request, body: { status: 'completed' }, complete: true });
  }
}


function formatPhoneNumber({ phoneNumber }) {
  let result = phoneNumber.replace(/[^\d]/g, '');
  if (result.slice(0, 2) !== '+1') {
    result = `+1${result}`;
  }
  return result;
}
