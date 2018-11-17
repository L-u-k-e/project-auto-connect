// Utility function to validate method arguments against a parameter schema

const { validate: validateAgainstSchema } = require('../libraries/json-schema-validation-utils');
const ErrorGens = require('./error-generators');





module.exports = validateServiceMethodArgs;





function validateServiceMethodArgs(method, args) {
  if (!method.parameterSchema) return;
  const schema = Object.assign({ type: 'object', additionalProperties: false }, method.parameterSchema);
  const validationResult = validateAgainstSchema({ schema, data: args });
  if (!validationResult.valid) {
    throw ErrorGens.generateRequestParamsError(validationResult.errors);
  }
}

