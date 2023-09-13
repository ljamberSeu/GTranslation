const fs = require("fs");
const path = require("path");
const axios = require("axios");

const parameters = {
  useGpt4: true
};

const gpt4Url =
`https://jgptforcodehelper.openai.azure.com/openai/deployments/
gpt4-32k/chat/completions?api-version=2023-03-15-preview`;
const gpt35Url =
"https://jgptforcodehelper.openai.azure.com/openai/deployments/gpt35/chat/completions?api-version=2023-03-15-preview";
const apiKey = "f266b8245c184133935a986c6f085c25";

function getSystemRolePrompt (locale) {
  return `As a re-translation helper, your task is to re provide the ${locale} 
    translation for the messages related to managing cryptocurrency on a web page.`;
}

async function callGptApi (sendSata) {
  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey
  };

  let response;
  try {
    if (parameters.useGpt4 && gpt4Url) {
      response = await axios.post(gpt4Url, sendSata, { headers });
    } else {
      response = await axios.post(gpt35Url, sendSata, { headers });
    }
  } catch (error) {
    console.log("GPT API request failed: ", error.response.status);
    console.log("GPT API error message: ", error.response.data);
    response = error.response;
  }

  if (response.status === 200) {
    const lineSatas = response.data.split("data: ");
    let aiResponse = "";
    for (const line of lineSatas) {
      if (line.indexOf("content") === -1) {
        continue;
      }
      const data = JSON.parse(line);
      aiResponse += data.choices[0].delta.content;
    }

    return aiResponse;
  }
  return "GPT API call failed";
}

function getInitialData (locale) {
  return ({
    messages: [
      {
        role: "system",
        content: getSystemRolePrompt(locale)
      }
    ],
    temperature: 0.7,
    top_p: 0.95,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 4096,
    stream: true
  });
}

module.exports = async function (context, req) {
  let responseMessage = "API Parameter error";
  let errorCode = 400;
  console.log(req.query.locale);
  console.log(req.query.messages);
  if (req.query.locale && req.query.messages) {
    const data = getInitialData(req.query.locale);
    let messagesArray = [];
    try {
      messagesArray = JSON.parse(req.query.messages);
      data.messages = [...data.messages, ...messagesArray];
      responseMessage = await callGptApi(data);
      errorCode = 200;
    } catch {
      console.log(`Parse parameters failed: ${JSON.stringify(req.query.messages)}`);
      responseMessage = "Parameter messages format errors";
    }
  }

  context.res = {
    body: responseMessage,
    status: errorCode
  };
};
