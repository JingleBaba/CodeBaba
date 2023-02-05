import Bolt from "@slack/bolt";

import dotenv from 'dotenv'
dotenv.config()

const App = Bolt.App;
// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.BOT_ACCESS_KEY,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.APP_ACCESS_SECRET 
});

app.message('CodeBaba', async ({ message, say }) => {
  console.log("running");
  // say() sends a message to the channel where the event was triggered
  await say(`Hey there <@${message.user}>!`);
});

(async () => {
  // Start your app
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();