const { bundleSchemas } = require('./json-schema-validation-utils');
/* eslint-disable global-require */

const schemas = [
  require('../json-schemas/snippets'),
  require('../json-schemas/websocket-events/app-server-api-request'),
];


module.exports = {
  asyncSchemas: bundleSchemas({ $async: true, schemas }),
  syncSchemas: bundleSchemas({ $async: false, schemas })
};
