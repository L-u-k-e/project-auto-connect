const { twiml: { VoiceResponse } } = require('twilio');
const { getClientAccessCodeByActiveTwilioCallSid } = require('../../libraries/app-client-registry-utils');




module.exports = enqueue;





function enqueue(req, res) {
  const { CallSid: callSid } = req.body;
  const voiceResponse = new VoiceResponse();
  const clientAccessCode = getClientAccessCodeByActiveTwilioCallSid(callSid);
  const queueName = `queue-${clientAccessCode}`;
  voiceResponse.enqueue({}, queueName);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
