const { twiml: { VoiceResponse } } = require('twilio');
const twilioUtils = require('../../libraries/twilio-utils');
const twilioWebhookRoutes = require('../../libraries/twilio-webhook-routes');
const {
  isAccessCodeInUse,
  onQueueConsumerConnect,
  isConsumerConnectedToAQueue,
  getClientAccessCodeByConsumerTwilioCallSid
} = require('../../libraries/app-client-registry-utils');




const twilioWebhookAPIURLBase = process.env.TWILIO_WEBHOOK_API_URL_BASE;
module.exports = consume;





async function consume(req, res) {
  const { Digits: reqAccessCode, CallSid: consumerCallSid } = req.body;
  console.log(req.body);
  if (isConsumerConnectedToAQueue(consumerCallSid)) {
    const accessCode = getClientAccessCodeByConsumerTwilioCallSid(consumerCallSid);
    await forwardAgentToQueue({ accessCode, res, req });
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
