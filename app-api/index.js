// Handles incoming websocket events and delegates tasks to the appropriate methodImpls.

const Ramda = require('ramda');
const ErrorGens = require('../libraries/error-generators');
const ErrorCodes = require('../libraries/error-codes');
const { validate: validateAgainstSchema } = require('../libraries/json-schema-validation-utils');
const validateServiceMethodArgs = require('../libraries/validate-service-method-args');
const { reply } = require('../libraries/socket-emitters');
const signIn = require('./sign-in');
const endCall = require('./end-call');
const call = require('./call');





const methodImpls = {
  call,
  sign_in: signIn,
  end_call: endCall,
};
module.exports = {
  initialize
};





// Performs initialization,
async function initialize(socketIOServer) {
  socketIOServer.on('connection', exposeMethods);
}





// Starts listening on a socket for api requests
function exposeMethods(socket) {
  Object.values(methodImpls).forEach(methodImpl => methodImpl.onSocketConnect(socket));

  socket.on('disconnect', () => {
    Object.values(methodImpls).forEach(methodImpl => methodImpl.onSocketDisconnect(socket));
  });

  socket.on('request', async request => {
    try {
      validateAPIRequestEvent(request);
      const { method } = request;
      if (!methodImpls[method]) {
        throw ErrorGens.generateInvalidMethodError(method);
      }

      if (methodImpls[method].parameterSchema) {
        validateServiceMethodArgs(methodImpls[method], request.params);
      }

      await methodImpls[method].fulfillRequest({ socket, request });
    } catch (caughtError) {
      let error = caughtError;
      if (!Ramda.has('code', error)) {
        error = ErrorGens.generateInternalError(caughtError);
      }
      if (error.code === ErrorCodes.internalError) {
        throw error;
      }

      if (request.id) {
        // if the error was an invalid message content error, its possible that the message is malformed and doesnt
        // have a header/ correlationID, which would mean that the reply function would throw an error
        reply({ socket, request, body: error, error: true });
      }
    }
  });
}





// Runs schema validation against incoming API request events
function validateAPIRequestEvent(request) {
  const { valid, errors } = validateAgainstSchema({ schemaID: 'app_server_api_request', data: request });
  if (!valid) throw ErrorGens.generateInvalidRequestError(errors);
}
