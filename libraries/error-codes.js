// Codes are inspired from: http://www.jsonrpc.org/specification#error_object

module.exports = {
  internalError: -32603,
  requestParamsError: -32602,
  invalidMethodError: -32601,
  invalidRequestError: -32600,
  tokenValidationError: -32000,
  invalidTokenEmailError: -32001,
  clientIsBusyError: -32002,
};
