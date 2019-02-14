const { endCall } = require('../../libraries/twilio-utils');
const { reply } = require('../../libraries/socket-emitters');
const validateIDToken = require('../../libraries/validate-google-sign-in-id-token');





module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
      call_id: { type: 'string' }
    },
    required: ['id_token', 'call_id']
  }
};





async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function fulfillRequest({ socket, request }) {
  const { params: { id_token: idToken, call_id: callID } } = request;
  await validateIDToken(idToken);
  await endCall(callID);
  reply({ socket, request, body: null, complete: true });
}
