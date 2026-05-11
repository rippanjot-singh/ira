const run = require("../services/ai.service");
const { initializeSetup, openApp, message, openWebsite, joinDiscordServer, closeApp } = require("../tools/ai.tools");

async function askAI(req, res) {
    try {
        const { userInput } = req.body;
        const input = userInput || "whats the capital of india?";
        console.log("Processing input:", input);

        const stream = await run(input);

        res.setHeader(
            "Content-Type",
            "text/plain"
        );

        res.setHeader(
            "Transfer-Encoding",
            "chunked"
        );

        for await (const chunk of stream) {
            if (chunk.content) {
                process.stdout.write(chunk.content);
                res.write(chunk.content);
            }

            if (chunk.tool_calls && chunk.tool_calls.length > 0) {
                for (const toolCall of chunk.tool_calls) {
                    if (toolCall.name === "initializeSetup") {
                        const result = await initializeSetup.invoke(toolCall.args);
                        res.write(`${result}`);
                    }
                    if (toolCall.name === "openApp") {
                        const result = await openApp.invoke(toolCall.args);
                        res.write(`${result}`);
                    }
                    if (toolCall.name === "message") {
                        const result = await message.invoke(toolCall.args);
                        res.write(`${result}`);
                    }
                    if (toolCall.name === "openWebsite") {
                        const result = await openWebsite.invoke(toolCall.args);
                        res.write(`${result}`);
                    }
                    if (toolCall.name === "joinDiscordServer") {
                        const result = await joinDiscordServer.invoke(toolCall.args);
                        res.write(`${result}`);
                    }
                    if (toolCall.name === "closeApp") {
                        const result = await closeApp.invoke(toolCall.args);
                        res.write(`${result}`);
                    }
                }
            }
        }

        res.end();
    } catch (error) {
        res.status(500).json({ status: false, error: error.message })
    }
}

module.exports = { askAI };
