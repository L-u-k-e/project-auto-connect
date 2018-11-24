const Ramda = require('ramda');
const { OAuth2Client } = require('google-auth-library');
const fs = require('fs');
const ErrorGens = require('./error-generators');
const whitelistedEmailAddresses = require('./email-whitelist');




const googleSignInAppCredentials = JSON.parse(fs.readFileSync('/run/secrets/google-sign-in-app-credentials'));
const clientID = `${googleSignInAppCredentials.web.client_id}.apps.googleusercontent.com`;
const googleOAuth2Client = new OAuth2Client(clientID);
module.exports = validateGoogleSignInIDToken;





async function validateGoogleSignInIDToken(idToken) {
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
}
