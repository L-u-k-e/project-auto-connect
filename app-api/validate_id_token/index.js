const Ramda = require('ramda');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const ErrorGens = require('../../libraries/error-generators');
const whitelistedEmailAddresses = require('../../libraries/email-whitelist');
const { reply } = require('../../libraries/socket-emitters');



const googleSignInAppCredentials = JSON.parse(fs.readFileSync('/run/secrets/google-sign-in-app-credentials'));
const clientID = `${googleSignInAppCredentials.web.client_id}.apps.googleusercontent.com`;
const googleOAuth2Client = new OAuth2Client(clientID);
module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest: validateIDToken,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
    },
    required: ['id_token']
  }
};



async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function validateIDToken({ socket, request }) {
  const { params: { id_token: idToken } } = request;
  let loginTicket;
  try {
    loginTicket = await googleOAuth2Client.verifyIdToken({
      idToken,
      audience: clientID
    });
  } catch (error) {
    throw ErrorGens.generateTokenValidationError(error);
  }

  const { email } = loginTicket.getPayload();
  if (!Ramda.contains(email, whitelistedEmailAddresses)) {
    throw ErrorGens.generateInvalidTokenEmailError(email);
  }

  reply({ socket, request, body: { valid: true }, complete: true });
}

