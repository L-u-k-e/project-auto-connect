const Express = require('express');
// const callStatusEventHandler = require('./call-status-event');
const consumeHandler = require('./consume');
const enqueueHandler = require('./enqueue');



const expressRouter = Express.Router();
module.exports = {
  initialize,
  expressRouter
};





// Performs initialization
function initialize() {
}





// expressRouter.post('call-status-event', callStatusEventHandler);
expressRouter.post('/enqueue', enqueueHandler);
expressRouter.post('/consume', consumeHandler);
