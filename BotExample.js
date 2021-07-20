const Discord = require('discord.js');
const config = require('./config.json');

const bot = new Discord.Client();
const prefix = config.prefix;



bot.commands = {};
const fs = require('fs');
/* read the commands directory and go through all files */
for (const file of fs.readdirSync(`${__dirname}/commands`)) {
   /* path to the current file */
   const path = `${__dirname}/commands/${file}`;
   /* exclude folders and files that arent javascript */
   if(!file.endsWith('.js') || !fs.lstatSync(path).isFile()) continue;
   const command = require(path);
   bot.commands[command.name] = command;
}

bot.on('ready', () => {
    console.log('Bot online')
    console.log('Guilds: '+ bot.guilds.cache.size)
    bot.user.setActivity('exaroton servers', {type: 'WATCHING'})
});

bot.on('message', async (msg) => {
    if (!msg.content.startsWith(prefix)) return;

    const args = msg.content.slice(prefix.length).split(" ");
    const commandName = args.shift().toLowerCase();

    const command = bot.commands[commandName];
    if (!command) return;
  
    await command.execute(msg, args, bot);
 });




bot.login(config.DiscordAPItoken)