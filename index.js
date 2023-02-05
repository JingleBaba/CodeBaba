const { App } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');
var http = require('http');

const app = new App({
  token: process.env.BOT_TOKEN, 
  appToken: process.env.APP_ACCESS_SECRET,
  socketMode: true,
});


(async () => {
  await app.start();
})();

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



module.exports =  (req,res) => {
	res.send("CodeBaba")};