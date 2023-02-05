const { App } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');
var http = require('http');

const app = new App({
  token: process.env.BOT_TOKEN, 
  appToken: process.env.APP_ACCESS_SECRET,
  socketMode: true,
});


//create a server object:
http.createServer((req, res) => {
  res.write('Welcome to CodeBaba')
  res.end(); 
  (async () => {
    // Start your app
    await app.start(process.env.PORT || 3000);
    console.log('⚡️ Bolt app is running!');
  })();
}).listen(8080);

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