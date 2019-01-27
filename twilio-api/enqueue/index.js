const { twiml: { VoiceResponse } } = require('twilio');
const twilioWebhookRoutes = require('../../libraries/twilio-webhook-routes');
const {
  getClientAccessCodeByActiveTwilioCallSid,
  isClientOnAnotherCall,
  onCallBridge
} = require('../../libraries/app-client-registry-utils');




const twilioWebhookAPIURLBase = process.env.TWILIO_WEBHOOK_API_URL_BASE;
module.exports = enqueue;




function enqueue(req, res) {
  const { CallSid: callSid } = req.body;
  const voiceResponse = new VoiceResponse();
  if (isClientOnAnotherCall(callSid)) {
    console.log('hanging up', callSid);
    voiceResponse.hangup();
  } else {
    onCallBridge(callSid);
    const clientAccessCode = getClientAccessCodeByActiveTwilioCallSid(callSid);
    const queueName = `queue-${clientAccessCode}`;
    voiceResponse.enqueue({}, queueName);
  }
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
}
