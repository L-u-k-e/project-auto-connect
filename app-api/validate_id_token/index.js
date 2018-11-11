const { reply } = require('../../libraries/socket-emitters');



module.exports = {
  onSocketConnect,
  onSocketDisconnect,
  fulfillRequest: validateIDToken,
  parameterSchema: {
    properties: {
      id_token: { type: 'string' },
    },
    required: ['id_token']
  }
};



async function onSocketConnect() {} // eslint-disable-line
async function onSocketDisconnect() {} // eslint-disable-line





async function validateIDToken({ socket, request }) {
  const { params: { id_token: idToken } } = request;
  console.log(idToken);
  reply({ socket, request, body: { valid: true }, complete: true });
}
