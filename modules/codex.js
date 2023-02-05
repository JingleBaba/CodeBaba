const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

const getResult = async(text) => {
    console.log(text);
    console.log("getresult function running");
    const {data} =  await openai.createCompletion({
        model: "code-davinci-002",
        prompt: text,
        temperature: 0,
        max_tokens: 260,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });

      const result = data?.choices[0]?.text ?? ''
      console.log(result, "output result");
      return result;
}
module.exports = getResult;
