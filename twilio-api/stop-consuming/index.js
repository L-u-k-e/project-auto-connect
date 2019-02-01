const { onQueueConsumerDisconnect } = require('../../libraries/app-client-registry-utils');





module.exports = stopConsuming;





async function stopConsuming(req, res) {
  const { CallSid: consumerCallSid } = req.body;
  // twilio incorrectly logs an "HTTP Retrieval failure" and indicates that a 15s timeout occurred with an 11200 error
  // if the response doesn't have a content type/ This seems like a twilio bug but whatever,
  // TLDR: don't remove the content type
  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end();
  onQueueConsumerDisconnect({ consumerCallSid });
}
