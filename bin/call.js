const Twilio = require('twilio');
const fs = require('fs-extra');

const { sid, authToken } = JSON.parse(fs.readFileSync('/run/secrets/twilio-credentials', 'utf8'));
const client = new Twilio(sid, authToken);

const contacts = [
   // { name: 'Brendan', number: '+18572312588' },
   { name: 'Nick', number: '+18608087654' },
   // { name: 'Nate', number: '+17175726625' },
   { name: 'Justin', number: '+14804064006' },
];
const twilioEnabledNumber = '+13156276319';


main();
async function main() {
  for (contact of contacts) {
    try {
      const call = await client.calls.create({
        url: 'http://27c41664.ngrok.io/enqueue',
        to: contact.number,
        from: twilioEnabledNumber
      });
    } catch (error) {
      console.error(error);
    }
  }
}
