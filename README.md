# PhoenixAPI-Bot
PhoenixAPI is a bot developed with discord.js. The main reason of this bot is the managment of [exaroton](https://exaroton.com/) servers using the exaroton API.
You can find the documentation about the exaroton API [here](https://support.exaroton.com/hc/en-us/articles/360019857878-API-documentation) and its package [here](https://developers.exaroton.com/).
 
# Using the bot
Requirements: [Node.js](https://nodejs.org/en/download/), [discord.js](https://discord.js.org/) & [exaroton API](https://www.npmjs.com/package/exaroton)
Check out our Spanish tutorial [here](https://www.youtube.com/watch?v=lYosqjZpIBE).
Follow the instructions to install your Discord bot:
1. Download the code and run `npm install`.
2. Create a [Discord application](https://discord.com/developers/applications/).
3. Add a bot to the application and copy the Token.
4. Go to your [exaroton settings](https://exaroton.com/account/) and copy your API token.
5. Open the config.json file and add your exaroton API token and your Discord API token.
6. Start the main.js file.
7. To invite the bot to your Guild use [this link](https://discord.com/oauth2/authorize?client_id=ID&scope=bot&permissions=75776) and replace the 'ID' with the client ID of your application.

# Commands
The default prefix is `API `.
If you want to change the prefix, open the config.json file and edit the prefix.
To get a full list of all available commands, use `API help` or click [here](https://www.alex22-sv.tk/en/bots/PhoenixAPI/#commands). You can also show more information about a specific command using `API help {command}`.

# Important
* **Status command**

    + Thanks to the [new update](https://developers.exaroton.com/#header-websocket-api) you can now get your server status in real time by using `API status {server name|ID|address}`, the bot will send an embed of the current status of that server and when an event happens (e.g. when someone joins the server or the status of the server changes, etc.) the bot will edit its embed with the new changes.
    + Note: I recommend creating a separate channel for your server information and embed, in which members are not allowed to send messages. This way, your embed always remains visible and can easily be found by your players.
* **PhoenixAPI is available for Spanish**
    + I have translated PhoenixAPI to Spanish and now you can use the bot in English or Spanish. The repository now includes two folders.
        1. The first one is named "EN" for English.
        2. The second one is named "ES" for Spanish.

* **Support**

    + I recommend joining my [Discord server](https://discord.com/invite/AAJPHqNXUy) if you have questions related to my Discord bot.
    + If you found a bug please create an [issue](https://github.com/Alex22-SV/PhoenixAPI-Bot/issues) on GitHub.


