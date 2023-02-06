const { App } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');

const app = new App({
  token: process.env.BOT_TOKEN, 
  signingSecret: process.env.SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_ACCESS_SECRET
});

app.event('message', async ({ event,say }) => {
  try {
    await say("Please wait while i get these answers from the divine world... :stuck_out_tongue_closed_eyes:");
    const data =  await getResult(event.text);
    await say("*Here's what i have found* :grin: ");
    if(data.includes('<code>')) {
      data.replace('<code>', '`');
      data.replace('</code>','`');
    }
    await say("```"+data+"```");
  }
  catch (error) {
    console.error(error);
  }
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);
  console.log('⚡️ Bolt app is running!');
})();


