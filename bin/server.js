const http = require('http');
const VoiceResponse = require('twilio').twiml.VoiceResponse;


main();
function main() {
  const server = http.createServer((req, res) => {
    const handlers = {
      '/enqueue': enqueue,
      '/consume':  consume
    };

    if (handlers[req.url]) {
      handlers[req.url]();
    }

    function enqueue() {
      console.log ('enqueue received');
      const twiml = new VoiceResponse();
      twiml.enqueue({}, 'sales');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    }

    function consume() {
      console.log('connect received');
      const twiml = new VoiceResponse();
      twiml.dial({ timeout: 300 }).queue({}, 'sales');
      res.writeHead(200, { 'Content-Type': 'text/xml' });
      res.end(twiml.toString());
    }
  });
  server.listen({ port: 1337 });

  console.log('TwiML server running at http://127.0.0.1:1337/');
}



