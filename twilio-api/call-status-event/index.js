// const { twiml: { VoiceResponse } } = require('twilio');
// const twilioUtils = require('../../libraries/twilio-utils');
// const { isAccessCodeInUse } = require('../../libraries/app-client-registry-utils');
// const { findClientByActiveTwilioCallSid } = require('../../libraries/app-client-registry-utils');




module.exports = callStatusEvent;





async function callStatusEvent(req, res) { // eslint-disable-line
  // const { sid } = req.body;
  console.log(req.body);
  // const client = findClientByActiveTwilioCallSid(sid)
}
