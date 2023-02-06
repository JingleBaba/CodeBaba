const { App,ExpressReceiver  } = require('@slack/bolt');
require('dotenv').config();
const getResult = require('./modules/codex');
const express = require('express')();


const expressReceiver = new ExpressReceiver({ 
  signingSecret: process.env.SIGNING_SECRET
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

express.get('/',(req,res) => {
  res.send("Welcome to CodeBaba");
})


express.use('/slack/events', expressReceiver.router);
