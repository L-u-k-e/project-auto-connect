const Twilio = require('twilio');
const fs = require('fs-extra');

const { sid, authToken } = JSON.parse(fs.readFileSync('/run/secrets/twilio-credentials', 'utf8'));
const client = new Twilio(sid, authToken);

const contacts = [
  // { name: 'Brendan', number: '+18572312588' },
  // { name: 'Nick', number: '+18608087654' },
  // { name: 'Luke', number: '+13158865733' },
];
const houseNumber = '+13153372032';
const natesNumber = '+17175726625'
const brendansNumber = '+18572312588';
const lukesNumber = '+13158865733';
const twilioEnabledNumber = '+13156276319';


main();
async function main() {
  try {
    const call = await client.calls.create({
      url: 'http://cb1f98cd.ngrok.io/enqueue',
      to: `${houseNumber}`,
      from: `${twilioEnabledNumber}`
    });
  } catch (error) {
    console.error(error);
  }
}
