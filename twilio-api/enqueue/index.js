const { twiml: { VoiceResponse } } = require('twilio');




module.exports = enqueue;





function enqueue(req, res) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.enqueue({}, 'queue-123456');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
