const { onQueueConsumerDisconnect } = require('../../libraries/app-client-registry-utils');





module.exports = stopConsuming;





async function stopConsuming(req, res) {
  const { CallSid: consumerCallSid } = req.body;
  res.end();
  onQueueConsumerDisconnect({ consumerCallSid });
}
