const Twilio = require('twilio');
const fs = require('fs-extra');

const { sid, authToken } = JSON.parse(fs.readFileSync('/run/secrets/twilio-credentials', 'utf8'));
const client = new Twilio(sid, authToken);

client.messages.create({
    body: 'Nick this is a message from the future. You smell',
    to: '+860808765',  // Text this number
    from: '+3156276319' // From a valid Twilio number
})
.then((message) => console.log(message.sid));
