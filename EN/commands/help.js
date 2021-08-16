const Discord = require('discord.js');
const {prefix, embedColor, errorColor} = require('../config.json');

module.exports = {
    name: 'help', 
    description: 'Display the list of commands or get information about a single command.',
    usage: '`'+prefix+'help {command}`',
    permission: '`None`',
    async execute(msg, args, bot){
        if(args.length === 0) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('PhoenixAPI | Prefix: `' + prefix + '`')
                .setColor(embedColor)
                .setDescription(Object.keys(bot.commands).map(command => '`'+command+'`').join(', '))
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL());
            await msg.channel.send(helpEmbed);
            return;
        }

        const commandName = args[0].toLowerCase();
        const command = bot.commands[commandName];

        if (command === undefined) {
            await msg.channel.send(new Discord.MessageEmbed()
                .setTitle('Error!')
                .setColor(errorColor)
                .setDescription(`Command {${args[0]}} not found.`)
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            );
            return;
        }
        
        const commandHelpEmbed = new Discord.MessageEmbed()
            .setDescription(`**Help for command [${command.name.toUpperCase()}](https://github.com/Alex0622/PhoenixAPI-Bot/blob/main/commands/${command.name}.js)**`)
            .setColor(embedColor)
            .addField('Description', command.description)
            .addField('Usage', command.usage)
            .addField('Required permission', command.permission)
            .setTimestamp()
            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL());
        await msg.channel.send(commandHelpEmbed);
    }
}