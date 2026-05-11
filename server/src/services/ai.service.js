const { ChatOllama } =
  require("@langchain/ollama");

const {
  initializeSetup,
  openApp,
  message,
  openWebsite,
  joinDiscordServer,
  closeApp
} = require("../tools/ai.tools");

const llm = new ChatOllama({
  model: "gemma4:latest",
  temperature: 0.7,
  think: false
});


const model = llm.bindTools([
  initializeSetup,
  openApp,
  message,
  openWebsite,
  joinDiscordServer,
  closeApp
]);

// c:\Users\Waheguru\Documents\CODING\PROJECTS\personal assistant\server\src\services\ai.service.js

const systemInstruction = `You are JARVIS, a helpful AI assistant.

STRICT TOOL USAGE RULES:
1. DO NOT use any tools for greetings (hi, hello, hey), casual conversation, or general questions. Just reply with friendly text.
2. ONLY use 'initializeSetup' if the user explicitly says words like "initialize", "setup", or "open all my apps".
3. ONLY use 'openApp' if the user explicitly says "open [app name]".
4. ONLY use 'message' if the user explicitly says "message [name] [message]".
5. If you are unsure whether to use a tool, DO NOT use it. Default to a text response.
6. Never hallucinate tools that don't exist.
7. Give the answer directly, dont show the thinking process
8. keep the answer very short and concise`;


async function run(userInput) {
  console.log('asking ai:', userInput);

  const messages = [
    ["system", systemInstruction],
    ["user", userInput]
  ];

  return await model.stream(messages);

}

module.exports = run;