const { Client, Intents } = require('discord.js');
const Discord = require("discord.js")
const config = require("./src/config.json");
const fs = require('fs');

async function main(){
	const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES], allowedMentions: { parse: [] } });
	bot.commands = {};
	const prefix = config.prefix
    for (const file of fs.readdirSync(`${__dirname}/src/commands`)) {
        const path = `${__dirname}/src/commands/${file}`;
        if(!file.endsWith('.js') || !fs.lstatSync(path).isFile()) continue;
        const command = require(path);
        bot.commands[command.name] = command;
    }
    bot.on('ready', () => {
        bot.user.setPresence({ status: 'online', activities: [{ type: 'WATCHING', name: 'servidores de exaroton'}]})
        console.log('Bot activado')
    	console.log('El bot está en: '+ bot.guilds.cache.size +' servidores')
	});
	bot.on("messageCreate", msg => {
		if(!msg.content.startsWith(prefix) || msg.author.bot) return;
		const args = msg.content.slice(prefix.length).split(" ");
    	const commandName = args.shift().toLowerCase();
		const command = bot.commands[commandName];
		if(!command) return
		command.execute(bot, msg, args)
	});
	bot.login(config.DiscordAPItoken)
}
main().catch(e => {
    console.error(e);
    process.exit(1);
})