import SlackBot from 'slackbots';
import dotenv from 'dotenv'
dotenv.config()

export const slackBotRoute = () => {
    const bot = new SlackBot({
        token: `${process.env.BOT_ACCESS_KEY}`,
        name: 'CodeBaba'
    })
    bot.on('start', () => {
        bot.postMessage('jingleBaba', 'Hello world!', params); 
    })
}