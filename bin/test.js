const Twilio = require('twilio');
const fs = require('fs-extra');

const { sid, authToken } = JSON.parse(fs.readFileSync('/run/secrets/twilio-credentials', 'utf8'));
const client = new Twilio(sid, authToken);

const contacts = [
  { name: 'Brendan', number: '+18572312588' },
  { name: 'Nick', number: '+18608087654' },
  { name: 'Luke', number: '+13158865733' },
]

const twilioEnabledNumber = '+13156276319';

main();
async function main() {
  try {
    for (contact of contacts) {
      const message = await client.messages.create({
        body: `Helo ${contact.name}`,
        to: contact.number,
        from: twilioEnabledNumber
      });
    }
  } catch (error) {
    console.error(error);
  }
}
