const { twiml: { VoiceResponse } } = require('twilio');
const twilioUtils = require('../../libraries/twilio-utils');
const twilioWebhookRoutes = require('../../libraries/twilio-webhook-routes');
const {
  isAccessCodeInUse,
  onQueueConsumerConnect,
  onQueueConsumerDisconnect,
  isConsumerConnectedToAQueue,
  getClientAccessCodeByConsumerTwilioCallSid
} = require('../../libraries/app-client-registry-utils');




const twilioWebhookAPIURLBase = process.env.TWILIO_WEBHOOK_API_URL_BASE;
module.exports = consume;





// This endpoint is hit under 3 scenarios
// 1.) An agent dials in to consume for the first time:
//     In this scenario we prompt them for an access code and then POST it to this endpoint
// 2.) This endpoint is POSTed to with the access code digits:
//     In this case we check to see if the access code is correct for any active clients and begin consumption if so
// 3.) When an answered call ends (either party hangs up) we redirect back to this endpoint
//     In this case we reinitate consumption if the hangup was not on the agents end
async function consume(req, res) {
  const { Digits: reqAccessCode, CallSid: consumerCallSid, CallStatus: callStatus } = req.body;
  console.log(req.body);
  if (isConsumerConnectedToAQueue(consumerCallSid)) {
    if (callStatus === 'completed') { // the agent hung up
      onQueueConsumerDisconnect({ consumerCallSid });
    } else {
      const accessCode = getClientAccessCodeByConsumerTwilioCallSid(consumerCallSid);
      await forwardAgentToQueue({ accessCode, res, req });
    }
  } else if (reqAccessCode) {
    if (isAccessCodeInUse(reqAccessCode)) {
      await forwardAgentToQueue({ accessCode: reqAccessCode, res, req });
      onQueueConsumerConnect({ accessCode: reqAccessCode, consumerCallSid });
    } else {
      relayInvalidAccessCode(req, res);
    }
  } else {
    promptAgentForAccessCode(req, res);
  }
}





function promptAgentForAccessCode(req, res) {
  const voiceResponse = new VoiceResponse();
  const gather = voiceResponse.gather({
    input: 'dtmf',
    timeout: 30,
    numDigits: 6,
  });
  gather.say('Please enter your 6 digit access code.');
  voiceResponse.say('We didn\'t receive any input. Goodbye!');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}





async function forwardAgentToQueue({ accessCode, res }) {
  const voiceResponse = new VoiceResponse();
  const queueName = `queue-${accessCode}`;
  await twilioUtils.assertCallQueue({ queueName });
  voiceResponse.dial({
    timeout: 300,
    // POST'ed to when the queue consumer hangs up
    // action: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.stopConsuming}`
  }).queue({
    // POST'ed to when a call is about to be bridged
    url: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.callStatusEvent}`
  }, queueName);

  // This runs then the agent or caller hangs up
  // We redirect to /consume again, which will dial and connect to the queue again
  voiceResponse.redirect();

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}





function relayInvalidAccessCode(req, res) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.say('The provided access code is not valid. Goodbye!');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
