// const { twiml: { VoiceResponse } } = require('twilio');
// const twilioUtils = require('../../libraries/twilio-utils');
// const { isAccessCodeInUse } = require('../../libraries/app-client-registry-utils');
const { onCallStatusEvent } = require('../../libraries/app-client-registry-utils');




module.exports = callStatusEvent;





async function callStatusEvent(req, res) { // eslint-disable-line
  const { CallSid: callSid, CallStatus: callStatus } = req.body;
  console.log('call status event', JSON.stringify(req.body, null, 2));
  res.end();
  onCallStatusEvent({ callSid, callStatus, req, res });
}
