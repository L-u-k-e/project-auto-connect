const { twiml: { VoiceResponse } } = require('twilio');
const twilioWebhookRoutes = require('../../libraries/twilio-webhook-routes');
const { getClientSocketByActiveTwilioCallSid } = require('../../libraries/app-client-registry-utils');




const twilioWebhookAPIURLBase = process.env.TWILIO_WEBHOOK_API_URL_BASE;
module.exports = dequeue;





function dequeue(req, res) {
  const { CallSid: callSid, QueueResult: queueResult } = req.body;
  const voiceResponse = new VoiceResponse();
  console.log('dequeue', JSON.stringify(req.body, null, 2));
  // console.log(JSON.stringify(req, null, 2));
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
  // https://www.twilio.com/docs/voice/twiml/enqueue#attributes-action-parameters-QueueResult
  /*
  const answered = ['bridged', 'bridging-in-progress'].includes(queueResult);
  if (answered) {
    const socket = getClientSocketByActiveTwilioCallSid(callSid);

  }

  const queueName = `queue-${clientAccessCode}`;
  voiceResponse.enqueue({
    action: `${twilioWebhookAPIURLBase}${twilioWebhookRoutes.onDequeue}`
  }, queueName);
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(voiceResponse.toString());
  */
}
