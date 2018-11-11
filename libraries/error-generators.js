// Functions to generate error objects.
// The error objects all implement a common interface: ({ message, code, data })

const ErrorCodes = require('./error-codes');

module.exports = {
  generateInternalError,
  generateRequestParamsError,
  generateInvalidMethodError,
  generateInvalidRequestError,
};





// Something went wrong and we're not exactly sure what.
function generateInternalError(data) {
  return {
    data,
    code: ErrorCodes.internalError,
    message: 'Internal Error',
  };
}





// The request params are invalid in some way that is determinable before action is taken.
function generateRequestParamsError(data) {
  return {
    data,
    code: ErrorCodes.requestParamsError,
    message: 'Invalid request parameters',
  };
}





// The method supplied does not exist
function generateInvalidMethodError(method) {
  return {
    code: ErrorCodes.invalidMethodError,
    message: 'Invalid method name',
    data: { supplied_method_name: method },
  };
}





// The object received is not a valid request object
function generateInvalidRequestError(data) {
  return {
    data,
    code: ErrorCodes.invalidRequestError,
    message: 'Invalid request object',
  };
}
