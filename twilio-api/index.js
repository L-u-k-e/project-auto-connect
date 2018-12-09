const Express = require('express');
const callStatusEventHandler = require('./call-status-event');
const consumeHandler = require('./consume');
const enqueueHandler = require('./enqueue');
const stopConsumingHandler = require('./stop-consuming');



const expressRouter = Express.Router();
module.exports = {
  initialize,
  expressRouter
};





// Performs initialization
function initialize() {
}





expressRouter.post('/enqueue', enqueueHandler);
expressRouter.post('/consume', consumeHandler);
expressRouter.post('/call-status-event', callStatusEventHandler);
expressRouter.post('/stop-consuming', stopConsumingHandler);
