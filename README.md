# PhoenixAPI-Bot
PhoenixAPI is a bot developed with discord.js. The main reason of this bot is the managment of [exaroton](https://exaroton.com/) servers using the exaroton API.
You can find the documentation about the exaroton API [here](https://support.exaroton.com/hc/en-us/articles/360019857878-API-documentation) and its package [here](https://www.npmjs.com/package/exaroton).
 
# Using the bot
Follow the instructions to install and configure your own Discord bot:
1. Install the [Node.js exaroton API client](https://www.npmjs.com/package/exaroton).
2. Open the config.json file and add your exaroton API token and your Discord API token.
3. Run your Discord bot.

# Commands
To get the list of commands use `API help`.

# Important changes
* **Status**: Thanks to the [new update](https://github.com/exaroton/node-exaroton-api#websocket-api) you can now get your server status in real time by using `API status {server name}`, the bot will send an embed of the current status of that server and when an event happens (e.g. when someone joins the server or the status of the server changes, etc.) the bot will edit its embed with the new changes.

* **Each command has its own file**: There is now a _Commands_ folder which contains all the available commands for the bot.

* **All commands require {server name}**: Before the v4 update, just a few commands required to add the {server name} parameter to the messages because the server was already defined in the config file, but now that was removed so you need to add the parameter on your messages. If you need help use `API help {command}`


