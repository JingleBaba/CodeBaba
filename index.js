import Bolt from "@slack/bolt";
import Express from 'express';
import dotenv from 'dotenv';
dotenv.config()

const app = Express();
const ExpressReceiver = Bolt.ExpressReceiver;
const boltAppConstructor = Bolt.App;

const boltReceiver = new ExpressReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  appToken: process.env.APP_ACCESS_SECRET,
})
const boltApp = new boltAppConstructor({token: process.env.BOT_ACCESS_KEY, receiver: boltReceiver});
// Initializes your app with your bot token and signing secret

boltApp.event('app_mention', async ({ event, context, client, say }) => {
  console.log("client");
  // say() sends a message to the channel where the event was triggered
  await say(`hello world`);
});

app.listen(process.env.PORT, () => {
  console.log(`app running on port ${process.env.PORT}`);
})

app.get('/', (req,res) => {
  res.send("Welcome to CodeBaba");
})

app.use('/slack/events', boltApp.receiver.router);