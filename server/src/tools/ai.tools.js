const { tool } = require("@langchain/core/tools");
const { z } = require("zod");
const { exec } = require("child_process");
const { keyboard, Key, sleep } = require("@nut-tree-fork/nut-js");
const util = require("util");

const execAsync = util.promisify(exec);


const initializeSetup = tool(
    async () => {
        try {
            console.log("Initialize setup calling")
            // Change your apps array to include /B
            const apps = [
                'start /B antigravity',
                'start /B brave',
                'start /B chatgpt',
                'start /B "" "C:\\Users\\Waheguru\\AppData\\Local\\Discord\\Update.exe" --processStart Discord.exe',
                'start /B "" "C:\\Users\\Waheguru\\AppData\\Local\\Postman\\Postman.exe"'
            ]
            apps.forEach(app => {
                exec(app)
            })

            exec('start spotify:playlist:6i8s3yj957qV2jeZ7RPU73', () => {
                setTimeout(() => {
                    exec('powershell -c "(New-Object -ComObject WScript.Shell).SendKeys(\' \')"');
                }, 3000);
            });

            console.log("Tools called successfully")
            return 'Setup initialized successfully'
        } catch (error) {
            return `error initializing the setup: ${error.message}`
        }
    },
    {
        name: "initializeSetup",
        description: "Use this tool to initialize the setup by opening all the required applications",
        schema: z.object({}),
    }
)

const openApp = tool(
    async ({ appName }) => {
        try {
            const app = appName.toLowerCase().toLowerCase().replace(/\s+/g, "")
            console.log("App name:", app);

            switch (app) {
                case "spotify":
                    exec(`start /B spotify:playlist:6i8s3yj957qV2jeZ7RPU73:play`)
                    return `Spotify opened successfully`
                case "discord":
                    exec(`start /B "" "C:\\Users\\Waheguru\\AppData\\Local\\Discord\\Update.exe" --processStart Discord.exe`)
                    return `Discord opened successfully`
                case "postman":
                    exec(`start /B "" "C:\\Users\\Waheguru\\AppData\\Local\\Postman\\Postman.exe"`)
                    return `Postman opened successfully`
                case "vscode":
                    exec(`start /B code`)
                    return `VSCode opened successfully`
                case "whatsapp":
                    exec(`start /B whatsapp:`)
                    return `Whatsapp opened successfully`
                case "antigravity":
                    exec(`start /B antigravity`)
                    return `Antigravity opened successfully`
                case "brave":
                    exec(`start /B brave`)
                    return `Brave opened successfully`
                case "linkedin":
                    await keyboard.pressKey(Key.LeftSuper, Key.LeftShift, Key.LeftAlt, Key.LeftControl, Key.L);
                    await keyboard.releaseKey(Key.LeftSuper, Key.LeftShift, Key.LeftAlt, Key.LeftControl, Key.L);
                    return `Brave opened successfully`
                default:
                    await keyboard.pressKey(Key.LeftSuper);
                    await keyboard.releaseKey(Key.LeftSuper);
                    await sleep(1000);
                    await keyboard.type(app);
                    await sleep(1000);
                    await keyboard.pressKey(Key.Enter);
                    await keyboard.releaseKey(Key.Enter);
                    return `${app} opened successfully`

            }
        } catch (error) {
            return `error opening the app: ${error.message}`
        }
    },
    {
        name: "openApp",
        description: "Use this tool to open an application, always pass full path of the application",
        schema: z.object({
            appName: z.string()
        }),
    }
)

const message = tool(
    async ({ name, message }) => {
        try {
            const userName = name.toLowerCase().trim()

            exec("start whatsapp:");
            console.log("Whatsapp opened successfully")

            // Open search
            await keyboard.pressKey(Key.LeftControl, Key.F);
            await keyboard.releaseKey(Key.LeftControl, Key.F);

            await sleep(1000);

            await keyboard.pressKey(Key.LeftControl, Key.A);
            await keyboard.releaseKey(Key.LeftControl, Key.A);

            await keyboard.pressKey(Key.Backspace);
            await keyboard.releaseKey(Key.Backspace);

            // Type contact name
            await keyboard.type(userName);

            await sleep(1000);

            // Press Enter to select contact
            await keyboard.pressKey(Key.Enter);
            await keyboard.releaseKey(Key.Enter);


            await sleep(500);

            console.log("contact selected successfully")

            await keyboard.pressKey(Key.LeftControl, Key.A);
            await keyboard.releaseKey(Key.LeftControl, Key.A);

            await keyboard.pressKey(Key.Backspace);
            await keyboard.releaseKey(Key.Backspace);

            // Type message
            await keyboard.type(message);

            await sleep(500);

            // Press Enter to send
            await keyboard.pressKey(Key.Enter);
            await keyboard.releaseKey(Key.Enter);

            return `Message sent to ${name}`

        } catch (error) {
            return `error messaging ${name} - ${message}: ${error.message}`
        }
    },
    {
        name: "message",
        description: "Use this tool to message someone on WhatsApp",
        schema: z.object({
            name: z.string(),
            message: z.string()
        }),
    }
)

const openWebsite = tool(
    async ({ url, newWindow = false }) => {
        try {
            console.log('web search tool using')
            console.log(url)
            if (newWindow) {
                exec(`start "" brave --new-window "${url}"`);
            } else {
                exec(`start "" brave "${url}"`);
            }
            return `Website opened successfully`
        } catch (error) {
            return `error opening the website: ${error.message}`
        }
    },
    {
        name: "openWebsite",
        description: "Use this tool to open a website, always pass full path of the website, if you need to search something on internet use search.brave.com/search?q= and pass the query in the url, but the user explicitly asks for some other search engine like google or duckduckgo, then use that search engine. If the user ask to search something on netflix, use https://www.netflix.com/search?q= and pass the query in the url",
        schema: z.object({
            url: z.string(),
            newWindow: z.boolean().default(false)
        }),
    }
)

const joinDiscordServer = tool(
    async ({ server, vc }) => {
        try {
            exec('start /B "" "C:\\Users\\Waheguru\\AppData\\Local\\Discord\\Update.exe" --processStart Discord.exe')

            await sleep(2000);

            await keyboard.pressKey(Key.LeftControl, Key.K);
            await keyboard.releaseKey(Key.LeftControl, Key.K);

            await sleep(500);

            await keyboard.type(server);

            await sleep(500);

            await keyboard.pressKey(Key.Enter);
            await keyboard.releaseKey(Key.Enter);

            await sleep(500);

            await keyboard.pressKey(Key.LeftControl, Key.K);
            await keyboard.releaseKey(Key.LeftControl, Key.K);

            await keyboard.type(vc);

            await keyboard.pressKey(Key.Enter);
            await keyboard.releaseKey(Key.Enter);

            return `Discord server joined successfully`
        } catch (error) {
            return `error joining the discord server: ${error.message}`
        }
    },
    {
        name: "joinDiscordServer",
        description: "Use this tool to join a discord server, always pass full path of the server and the voice channel, ",
        schema: z.object({
            server: z.string(),
            vc: z.string()
        }),
    }
)

const closeApp = tool(
    async ({ appName }) => {
        try {

            console.log("closing", appName);

            // find matching process
            const { stdout } = await execAsync(
                `powershell "gps | where {$_.MainWindowTitle -like '*${appName}*'} | select -First 1 -ExpandProperty ProcessName"`
            );

            const process = stdout.trim();

            if (!process) {
                return `could not find ${appName}`;
            }

            console.log("found process:", process);

            await execAsync(
                `taskkill /IM "${process}.exe" /F`
            );

            return `${appName} closed successfully`;

        } catch (error) {
            return `error closing app: ${error.message}`;
        }
    },
    {
        name: "closeApp",
        description: "Close an application",
        schema: z.object({
            appName: z.string()
        }),
    }
);

module.exports = {
    initializeSetup,
    openApp,
    message,
    openWebsite,
    joinDiscordServer,
    closeApp
}