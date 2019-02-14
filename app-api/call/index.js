const { call } = require('../../libraries/twilio-utils');
const { reply } = require('../../libraries/socket-emitters');
const { generateClientIsBusyError } = require('../../libraries/error-generators');
const validateIDToken = require('../../libraries/validate-google-sign-in-id-token');
const {
  onBridgedCallDisconnect,
  isClientOnACall,
  isClientOnAnotherCall,
} = require('../../libraries/app-client-registry-utils');





module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
      phone_number: { type: 'string' },
      client_id: { type: 'string' }
    },
    required: ['id_token', 'phone_number', 'client_id']
  }
};





async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function fulfillRequest({ socket, request }) {
  const { params: { id_token: idToken, client_id: clientID, phone_number: phoneNumber } } = request;
  await validateIDToken(idToken);

  if (isClientOnACall(clientID)) {
    throw generateClientIsBusyError(clientID);
  } else {
    reply({ socket, request, body: { status: 'calling' }, complete: false });
    const formattedPhoneNumber = formatPhoneNumber({ phoneNumber });
    console.log('initiating twilio call');
    await call({
      clientID,
      phoneNumber: formattedPhoneNumber,
      statusCallbacks: {
        queued: null,
        initiated: null,
        ringing: null,
        'in-progress': onPartyConnection,
        completed: onCompleted,
      }
    });
  }


  /*
  const onAnsweredTimeout = getRandomInt(1000, 7000);
  const onCompletedTimeout = onAnsweredTimeout + 300;
  setTimeout(onAnswered, onAnsweredTimeout);
  setTimeout(onCompleted, onCompletedTimeout);
  */

  function onPartyConnection({ callSid }) {
    console.log('on party connection');
    reply({
      socket,
      request,
      complete: false,
      body: { status: 'answered', callID: callSid },
    });
  }

  function onCompleted({ callSid }) {
    const clientIsOnAnAnsweredCall = isClientOnAnotherCall(callSid);
    onBridgedCallDisconnect(callSid);
    reply({
      socket,
      request,
      complete: true,
      body: {
        clientIsOnAnAnsweredCall,
        status: 'completed',
      },
    });
  }
}


function formatPhoneNumber({ phoneNumber }) {
  let result = phoneNumber.replace(/[^\d]/g, '');
  if (result.slice(0, 2) !== '+1') {
    result = `+1${result}`;
  }
  return result;
}
