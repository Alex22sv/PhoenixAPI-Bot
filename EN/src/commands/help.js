const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    name: 'help', 
    description: 'Display the list of commands or get information about a single command.',
    usage: '`'+prefix+'help {command}`',
    permission: '`None`',
    async execute(bot, msg, args){
        if(args.length === 0) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle(bot.user.username + ' | Prefix: `' + prefix + '`')
                .setColor(config.embedColor)
                .setDescription(Object.keys(bot.commands).map(command => '`'+command+'`').join(', '))
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
            await msg.channel.send({embeds:[helpEmbed]})
            return;
        }

        const commandName = args[0].toLowerCase();
        const command = bot.commands[commandName];

        if (command === undefined) {
            commandNotFound = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setColor(config.errorColor)
                .setDescription(`Command {${args[0]}} not found.`)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
            await msg.channel.send({embeds:[commandNotFound]})
            return;
        }
        
        const commandHelpEmbed = new Discord.MessageEmbed()
            .setDescription(`**Help for command [${command.name.toLowerCase()}](https://github.com/Alex0622/PhoenixAPI-Bot/blob/main/EN/src/commands/${command.name}.js)**`)
            .setColor(config.embedColor)
            .addField('Description', command.description)
            .addField('Usage', command.usage)
            .addField('Required permission', command.permission)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
        await msg.channel.send({embeds:[commandHelpEmbed]})
    }
}