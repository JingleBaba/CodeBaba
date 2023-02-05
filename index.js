const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.BOT_TOKEN, 
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true,
});

(async () => {
  await app.start();
  console.log('⚡️ Bolt app started');
})();

// subscribe to 'app_mention' event in your App config
// need app_mentions:read and chat:write scopes
app.event('app_mention', async ({ event, context, client, say }) => {
  try {
    await say({"blocks": [
      {
        "type": "section",
        "text": {
          "type": "mrkdwn",
          "text": `Thanks for the mention <@${event.user}>! Here's a button`
        },
        "accessory": {
          "type": "button",
          "text": {
            "type": "plain_text",
            "text": "Button",
            "emoji": true
          },
          "value": "click_me_123",
          "action_id": "first_button"
        }
      }
    ]});
  }
  catch (error) {
    console.error(error);
  }
});