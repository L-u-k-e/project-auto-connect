const { twiml: { VoiceResponse } } = require('twilio');
const twilioUtils = require('../../libraries/twilio-utils');
const { isAccessCodeInUse } = require('../../libraries/app-client-registry-utils');




module.exports = consume;





async function consume(req, res) {
  if (req.body.Digits) {
    await forwardAgentToQueue(req, res);
  } else {
    await promptAgentForAccessCode(req, res);
  }
}





async function promptAgentForAccessCode(req, res) {
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
  const queueAccessCode = req.body.Digits;
  const voiceResponse = new VoiceResponse();
  if (isAccessCodeInUse(queueAccessCode)) {
    const queueName = `queue-${queueAccessCode}`;
    await twilioUtils.assertCallQueue({ queueName });
    voiceResponse.dial({ timeout: 300 }).queue({}, queueName);
  } else {
    voiceResponse.say('The provided access code is not valid. Goodbye!');
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
