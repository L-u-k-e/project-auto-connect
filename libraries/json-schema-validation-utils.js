/**
 * Utility functions to help with validating Object schemas (sync)
 *
 * Envirnment requirements: ES 5
 */

var Ramda = require('ramda');
var AJV = require('ajv');
const addMergePatchToAJV = require('ajv-merge-patch');
const addKeywordsToAJV = require('ajv-keywords');

var sharedAJV = new AJV({
  allErrors: true,
  verbose: true,
  $data: true,
  multipleOfPrecision: 6
});
addMergePatchToAJV(sharedAJV);
addKeywordsToAJV(sharedAJV);





module.exports = {
  addSchema: addSchema,
  validate: validate,
  bundleSchemas: bundleSchemas
};





function addSchema(schema) {
  sharedAJV.addSchema(schema);
}





function validate(args) {
  var valid = false;
  var errrors = [];
  if (args.schemaID) {
    valid = sharedAJV.validate(args.schemaID, args.data);
    errors = sharedAJV.errors;
  } else {
    var validateSchema = sharedAJV.compile(args.schema);
    valid = validateSchema(args.data);
    errors = validateSchema.errors;
  }
  return { valid: valid, errors: errors };
}





function bundleSchemas(args) {
  var definitions = Ramda.reduce(
    function (accum, schema) {
      var nextSchemas = Ramda.clone(accum);
      nextSchemas[schema.$id] = Ramda.merge(schema, { $async: args.$async });
      return nextSchemas;
    },
    {},
    args.schemas
  );

  return {
    definitions: definitions,
    $schema: 'http://json-schema.org/draft-07/schema#',
    $id: 'root',
    title: 'Root',
    description: 'This the root schema. Validate against the definitions inside of this schema.',
  };
}
