const Twilio = require('twilio');
const twilioWebhookRoutes = require('./twilio-webhook-routes');
const fs = require('fs');



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





async function call({ phoneNumber, statusCallbacks = {} }) { // eslint-disable-line
  console.log(twilioWebhookRoutes.enqueue, phoneNumber, twilioEnabledNumber);
  await twilioClient.calls.create({
    url: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.enqueue}`,
    to: phoneNumber,
    from: twilioEnabledNumber,
    // statusCallback: 'https://www.myapp.com/events',
    // statusEvents: Object.keys(statusCallbacks),
    // statusCallbackMethod: 'POST',
  });
}




async function assertCallQueue({ queueName }) {
  try {
    await twilioClient.queues.create({ friendlyName: queueName });
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
