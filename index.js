const { App,ExpressReceiver  } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');

const app = new App({
  token: process.env.BOT_TOKEN, 
  signingSecret: process.env.SIGNING_SECRET,
});

// app.event('message', async ({ event,say }) => {
//   try {
//     await say("please wait while we fetch the result...");
//     const data =  await getResult(event.text);
//     await say(data);
//   }
//   catch (error) {
//     console.error(error);
//   }
// });

app.message('hello', async ({ message, say }) => {
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();


module.exports = function handler(req, res) {
  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}

