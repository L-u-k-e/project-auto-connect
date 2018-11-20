const { twiml: { VoiceResponse } } = require('twilio');
const twilioUtils = require('../../libraries/twilio-utils');



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
  const queueName = `queue-${queueAccessCode}`;
  const voiceResponse = new VoiceResponse();
  await twilioUtils.assertCallQueue({ queueName });
  voiceResponse.dial({ timeout: 300 }).queue({}, queueName);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
