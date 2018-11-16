const Express = require('express');
const twilioUtils = require('../libraries/twilio-utils');




const expressRouter = Express.Router();
module.exports = {
  initialize
};





// Performs initialization
function initialize() {
}





expressRouter.post('call-status-event', twilioUtils.handleCallStatusEvent);
expressRouter.post('enqueue', null);
expressRouter.post('consume', null);
