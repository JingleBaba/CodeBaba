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

// Post a message to a channel your app is in using ID and message text
async function publishMessage(id, text) {
  try {
    // Call the chat.postMessage method using the built-in WebClient
    const result = await boltApp.client.chat.postMessage({
      // The token you used to initialize your app
      token: "xoxb-your-token",
      channel: id,
      text: text
      // You could also use a blocks[] array to send richer content
    });

    // Print result, which includes information about the message (like TS)
    console.log(result);
  }
  catch (error) {
    console.error(error);
  }
}

boltApp.event('message.im', async ({ event,say }) => {
  console.log("running");
  console.log("userID", event.user);
  // say() sends a message to the channel where the event was triggered
    await publishMessage(event.user, 'hello test')
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