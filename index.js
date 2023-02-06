const { App } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');

const app = new App({
  token: process.env.BOT_TOKEN, 
  appToken: process.env.APP_ACCESS_SECRET,
  socketMode: true,
});

( async () => {
  await app.start(3000);
})();

module.exports = function handler(req, res) {
  const { name = 'World' } = req.query;
  return res.send(`Hello ${name}!`);
}

app.event('message', async ({ event,say }) => {
  try {
    await say("please wait while we fetch the result...");
    const data =  await getResult(event.text);
    await say(data);
  }
  catch (error) {
    console.error(error);
  }
});