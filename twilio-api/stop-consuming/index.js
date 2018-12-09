const { onQueueConsumerDisconnect } = require('../../libraries/app-client-registry-utils');





module.exports = stopConsuming;





async function stopConsuming(req) {
  const { CallSid: consumerCallSid } = req.body;
  onQueueConsumerDisconnect({ consumerCallSid });
}
