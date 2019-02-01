// const { twiml: { VoiceResponse } } = require('twilio');
// const twilioUtils = require('../../libraries/twilio-utils');
// const { isAccessCodeInUse } = require('../../libraries/app-client-registry-utils');
const { onCallStatusEvent } = require('../../libraries/app-client-registry-utils');




module.exports = callStatusEvent;





async function callStatusEvent(req, res) { // eslint-disable-line
  const { CallSid: callSid, CallStatus: callStatus } = req.body;
  console.log('call status event', JSON.stringify(req.body, null, 2));
  // twilio incorrectly logs an "HTTP Retrieval failure" and indicates that a 15s timeout occurred with an 11200 error
  // if the response doesn't have a content type/ This seems like a tqilio bug but whatever,
  // TLDR: don't remove the content type
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end();
  onCallStatusEvent({ callSid, callStatus, req, res });
}
