const { App,ExpressReceiver  } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');
const express = require('express');

const expressApp = express();


const expressReceiver = new ExpressReceiver({ 
  signingSecret: process.env.SIGNING_SECRET,
  endpoints:'/'
})

const app = new App({
  token: process.env.BOT_TOKEN, 
  receiver: expressReceiver
});

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

expressApp.listen(3000, () => {
  console.log("Server initiated");
})

expressApp.get('/',(req,res) => {
  res.send("Welcome to CodeBaba");
})


expressApp.use('/slack/events', app.receiver.router);
