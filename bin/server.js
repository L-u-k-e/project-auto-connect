const Express = require('express');
const Chalk = require('chalk');
const HTTP = require('http');
const Path = require('path');
const SocketIO = require('socket.io');
const Webpack = require('webpack');
const History = require('connect-history-api-fallback');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const { addSchema } = require('../libraries/json-schema-validation-utils');
const schemaBundles = require('../libraries/schema-bundles');
const appAPIImpl = require('../app-api');





// unhandled errors should crash the process
process.on('unhandledRejection', error => {
  console.error(error);
  console.error(JSON.stringify(error, null, 2));
  console.error(error.toString());
  throw error;
});




const validTestEmailAddresses = ['hi.lucas.p@gmail.com'];

main();
async function main() {
  addSchema(schemaBundles.syncSchemas);
  const expressApp = Express();

  expressApp.post('/enqueue', (req, res) => {
    console.log ('enqueue received');
    const twiml = new VoiceResponse();
    twiml.enqueue({}, 'sales');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });

  expressApp.post('/consume', (req, res) => {
    console.log('connect received');
    const twiml = new VoiceResponse();
    twiml.dial({ timeout: 300 }).queue({}, 'sales');
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
  });

  expressApp.post('/oauth2-callback', (req, res) => {
    console.log('callback received post');
  });

  expressApp.get('/oauth2-callback', (req, res) => {
    console.log('callback received get');
  });

  if (process.env.NODE_ENV === 'development') {
    expressApp.use(History());
    const config= require('../config/webpack.config.dev'); // eslint-disable-line
    const primedWebpackCompiler = Webpack(config);
    expressApp.use(
      WebpackDevMiddleware(
        primedWebpackCompiler,
        {
          publicPath: config.output.publicPath,
          stats: {
            colors: true
          }
        }
      )
    );
    expressApp.use(
      WebpackHotMiddleware(primedWebpackCompiler)
    );
  } else {
    expressApp.use(Express.static(Path.join(__dirname, '..', 'client-build')));
    expressApp.get('*', (req, res) => {
      // handle every route with index.html, where the react router will take over
      res.sendFile('index.html', { root: Path.join(__dirname, '..', 'client-build') });
    });
  }

  const httpServer = HTTP.createServer(expressApp);
  const socketIOServer = SocketIO(httpServer);
  appAPIImpl.initialize(socketIOServer);
  const port = process.env.PORT || 80;
  httpServer.listen(port, err => {
    if (err) {
      console.log(Chalk.red(err));
      return;
    }
    console.log(Chalk.cyan(`Listening for connections on port ${port}`));
  });
}
