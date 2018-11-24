const validateGoogleSignInIDToken = require('../../libraries/validate-google-sign-in-id-token');
const { reply } = require('../../libraries/socket-emitters');
const { registerNewAppClient } = require('../../libraries/app-client-registry-utils');





module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest: signIn,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
    },
    required: ['id_token']
  }
};





async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function signIn({ socket, request }) {
  const { params: { id_token: idToken } } = request;
  await validateGoogleSignInIDToken(idToken);
  const { accessCode, clientID } = registerNewAppClient();
  reply({
    socket,
    request,
    body: {
      valid: true,
      accessCode,
      clientID,
    },
    complete: true
  });
}
