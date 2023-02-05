import Bolt from "@slack/bolt";
import Express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = Express();
const ExpressReceiver = Bolt.ExpressReceiver;
const boltAppConstructor = Bolt.App;

const boltReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_ACCESS_SECRET,
  endpoints:'/'
})
const boltApp = new boltAppConstructor({token: process.env.BOT_ACCESS_KEY, receiver: boltReceiver});
// Initializes your app with your bot token and signing secret

boltApp.message('CodeBaba', async ({ message, say }) => {
  console.log("running");
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

app.listen(process.env.PORT, () => {
  console.log("hello world");
})

app.get('/', (req,res) => {
  res.send("Welcome to CodeBaba");
})

app.use('/slack/events', boltApp.receiver.router);