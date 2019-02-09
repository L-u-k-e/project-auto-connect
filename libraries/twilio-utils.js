const Twilio = require('twilio');
const fs = require('fs');
const twilioWebhookRoutes = require('./twilio-webhook-routes');
const { registerActiveTwilioCall } = require('./app-client-registry-utils');



let twilioClient = null;
const twilioEnabledNumber = process.env.TWILIO_ENABLED_NUMBER;
const twilioWebhookAPIURLBase = process.env.TWILIO_WEBHOOK_API_URL_BASE;
module.exports = {
  initialize,
  call,
  assertCallQueue,
};





async function initialize() {
  if (!twilioClient) {
    const { sid, authToken } = JSON.parse(fs.readFileSync('/run/secrets/twilio-credentials', 'utf8'));
    twilioClient = new Twilio(sid, authToken);
  }
}





async function call({ clientID, phoneNumber, statusCallbacks = {} }) { // eslint-disable-line
  console.log('creating twilio call');
  const { sid } = await twilioClient.calls.create({
    url: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.enqueue}`,
    to: phoneNumber,
    from: twilioEnabledNumber,
    statusCallback: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.callStatusEvent}`,
    statusEvents: Object.keys(statusCallbacks),
    statusCallbackMethod: 'POST',
  });
  console.log(clientID, sid);
  registerActiveTwilioCall({ callSid: sid, clientID, statusCallbacks });
}



// Twilio doesn't have an assert queue endpoint so we'll just try to create it and swallow "already exists" errors
// We actually have a list of error codes from twilio for this, but for some reason 22003 ("already exists") isn't
// in it. The error twilio returns also has a "moreInfo" property which contains a url that links to a non-existant
// docs page.
// {
//   status: 400,
//   message: 'A queue with the name queue-576869 already exists',
//   code: 22003,
//   moreInfo: 'https://www.twilio.com/docs/errors/22003',
//   detail: undefined
// }
const queueExistsErrorCode = 22003;
async function assertCallQueue({ queueName }) {
  try {
    await twilioClient.queues.create({
      friendlyName: queueName,
    });
  } catch (error) {
    if (error.code === queueExistsErrorCode) return;
    throw error;
  }
}
/*
function handleStatusEvent(statusEvent) {
  const {
    sid,
    ...
  } = statusEvent;

  const callback = Ramda.view(Ramda.lensPath([sid, eventType]), pendingStatusEventCallbacks);
  if (callback) {
    callback(statusEvent);
  }
}
*/
