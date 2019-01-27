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




async function assertCallQueue({ queueName }) {
  try {
    await twilioClient.queues.create({
      friendlyName: queueName,
    });
  } catch (error) {
    console.log(error);
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
