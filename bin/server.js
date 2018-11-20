const Express = require('express');
const Chalk = require('chalk');
const HTTP = require('http');
const Path = require('path');
const SocketIO = require('socket.io');
const Webpack = require('webpack');
const History = require('connect-history-api-fallback');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const WebpackHotMiddleware = require('webpack-hot-middleware');
const bodyParser = require('body-parser');
const { addSchema } = require('../libraries/json-schema-validation-utils');
const schemaBundles = require('../libraries/schema-bundles');
const twilioUtils = require('../libraries/twilio-utils');
const appAPIImpl = require('../app-api');
const twilioAPIImpl = require('../twilio-api');





// unhandled errors should crash the process
process.on('unhandledRejection', error => {
  console.error(error);
  console.error(JSON.stringify(error, null, 2));
  console.error(error.toString());
  throw error;
});





main();
async function main() {
  addSchema(schemaBundles.syncSchemas);
  const expressApp = Express();

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

  expressApp.use(bodyParser.urlencoded({ extended: false }));

  await twilioUtils.initialize();
  expressApp.use('/twilio-webhook', twilioAPIImpl.expressRouter);
  const httpServer = HTTP.createServer(expressApp);
  const socketIOServer = SocketIO(httpServer);
  await appAPIImpl.initialize(socketIOServer);
  const port = process.env.PORT || 80;
  httpServer.listen(port, err => {
    if (err) {
      console.log(Chalk.red(err));
      return;
    }
    console.log(Chalk.cyan(`Listening for connections on port ${port}`));
  });
}
