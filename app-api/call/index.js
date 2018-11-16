// const { call } = require('../../libraries/twilio-utils');
const { reply } = require('../../libraries/socket-emitters');



module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
    },
    required: ['id_token']
  }
};



async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function fulfillRequest({ socket, request }) {
  const { params: { id_token: idToken, phone_number: phoneNumber } } = request;
  console.log(idToken);
  reply({ socket, request, body: { status: 'calling' }, complete: false });
  const formattedPhoneNumber = formatPhoneNumber({ phoneNumber });
  console.log(formattedPhoneNumber);
  /*
  await call({
    phoneNumber: formattedPhoneNumber,
    statusCallbacks: {
      queued: null,
      initiated: null,
      ringing: null,
      answered: onAnswered,
      completed: onCompleted,
    }
  });
  */

  setTimeout(onAnswered, 5000);
  setTimeout(onCompleted, 15000);

  function onAnswered() {
    reply({ socket, request, body: { status: 'answered' }, complete: false });
  }

  function onCompleted() {
    reply({ socket, request, body: { status: 'completed' }, complete: true });
  }
}


async function formatPhoneNumber({ phoneNumber }) {
  let result = phoneNumber.replace(/[^\d]/g, '');
  if (result.slice(0, 2) !== '+1') {
    result = `+1${result}`;
  }
  return result;
}
