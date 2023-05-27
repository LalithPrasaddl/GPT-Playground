import { Configuration, OpenAIApi } from 'openai';
import {keys} from './assets.js';

const configuration = new Configuration({
  organization: keys.organization,
  apiKey: keys.apiKey
});
const openai = new OpenAIApi(configuration);

function logData(response) {
  console.log('--------------------------------------------------------------------------------------------------------------------------------------');
  console.log('--------------------------------------------------------------------------------------------------------------------------------------');
  console.log(response.data);
  console.log('--------------------------------------------------------------------------------------------------------------------------------------');
  console.log('--------------------------------------------------------------------------------------------------------------------------------------');
}

async function gptModels() {
  const response = await openai.listModels();
  logData(response)
  testGpt()
}

async function testGpt() {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: "Say this is a test",
      max_tokens: 7,
      temperature: 0,
    });
    logData(response)
    generateImage()
  }
  catch(err) {
    console.log(err);
  }
}

async function generateImage() {
  const response = await openai.createImage({
    prompt: "A cute baby panda in heavy Bangalore Traffic and heavy rain.",
    n: 2,
    size: "1024x1024",
  });
  logData(response)
  qAndA("Q: {My name is Govinda. I want to do MBA in India, what are my options?} \n A:");
  qAndA("Q: {I want to ask salary hike to my manager, please generate a slck message for the same.} \n A:");
}

async function qAndA(prompt) {
  const response = await openai.createCompletion({
      model:"text-davinci-002",
      prompt,
      max_tokens:1024,
      n:1,
      stop:'None',
      temperature: 0.7,
  })
  logData(response)
}

gptModels()
