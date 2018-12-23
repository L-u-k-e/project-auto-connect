const { twiml: { VoiceResponse } } = require('twilio');
const twilioUtils = require('../../libraries/twilio-utils');
const twilioWebhookRoutes = require('../../libraries/twilio-webhook-routes');
const { isAccessCodeInUse, onQueueConsumerConnect } = require('../../libraries/app-client-registry-utils');




const twilioWebhookAPIURLBase = process.env.TWILIO_WEBHOOK_API_URL_BASE;
module.exports = consume;





async function consume(req, res) {
  const { Digits: accessCode, CallSid: consumerCallSid } = req.body;
  console.log(req.body);
  if (accessCode) {
    if (isAccessCodeInUse(accessCode)) {
      await forwardAgentToQueue(req, res);
      onQueueConsumerConnect({ accessCode, consumerCallSid });
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





async function forwardAgentToQueue(req, res) {
  const voiceResponse = new VoiceResponse();
  const queueAccessCode = req.body.Digits;
  const queueName = `queue-${queueAccessCode}`;
  await twilioUtils.assertCallQueue({ queueName });
  voiceResponse.dial({
    timeout: 300,
    action: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.stopConsuming}`
  }).queue({
    // this url is POST'd to when a call is about to leave the queue (be answered)
    url: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.callStatusEvent}`
  }, queueName);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}





function relayInvalidAccessCode(req, res) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.say('The provided access code is not valid. Goodbye!');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
