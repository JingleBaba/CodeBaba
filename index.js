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
  endpoints:'/'
})
const boltApp = new boltAppConstructor({token: process.env.BOT_ACCESS_KEY, receiver: boltReceiver});
// Initializes your app with your bot token and signing secret



boltApp.event('message', ({ event,say }) => {
  say("Processing your request this might take a min or 2");
  say(event.text);
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at ${process.env.PORT}`);
})

app.get('/', (req,res) => {
  res.send("Welcome to CodeBaba");
})

app.post('/', (req,res) => {
  console.log(req.body);
  res.send("Welcome to CodeBaba");
})
app.use('/slack/events', boltApp.receiver.router);