const Twilio = require('twilio');
const twilioWebhookRoutes = require('./twilio-webhook-routes');
const fs = require('fs');



let twilioClient = null;
const twilioEnabledNumber = process.env.TWILIO_ENABLED_NUMBER || '+13156276319';
module.exports = {
  initialize,
  call
};





async function initialize() {
  if (!twilioClient) {
    const { sid, authToken } = JSON.parse(fs.readFileSync('/run/secrets/twilio-credentials', 'utf8'));
    twilioClient = new Twilio(sid, authToken);
  }
}





async function call({ phoneNumber, statusCallbacks = {} }) {
  await twilioClient.calls.create({
    url: twilioWebhookRoutes.enqueue,
    to: phoneNumber,
    from: twilioEnabledNumber,
    statusCallback: 'https://www.myapp.com/events',
    statusEvents: Object.keys(statusCallbacks),
    statusCallbackMethod: 'POST',
  });
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
