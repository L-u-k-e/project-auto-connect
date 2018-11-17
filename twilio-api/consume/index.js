const { twiml: { VoiceResponse } } = require('twilio');




module.exports = consume;





function consume(req, res) {
  const voiceResponse = new VoiceResponse();
  voiceResponse.dial({ timeout: 300 }).queue({}, 'sales');
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
  console.log(voiceResponse.toString());
}
