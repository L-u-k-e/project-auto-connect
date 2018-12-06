const { twiml: { VoiceResponse } } = require('twilio');
const twilioUtils = require('../../libraries/twilio-utils');
const queueStates = require('../../libraries/queue-states');
const { isAccessCodeInUse, setQueueStatus } = require('../../libraries/app-client-registry-utils');




module.exports = consume;





async function consume(req, res) {
  const accessCode = req.body.Digits;
  if (accessCode) {
    if (isAccessCodeInUse(accessCode)) {
      await forwardAgentToQueue(req, res);
      console.log('setting queue status');
      setQueueStatus({ accessCode, queueStatus: queueStates.CONNECTED });
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
  voiceResponse.dial({ timeout: 300 }).queue({}, queueName);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}





function relayInvalidAccessCode(req, res) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.say('The provided access code is not valid. Goodbye!');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
