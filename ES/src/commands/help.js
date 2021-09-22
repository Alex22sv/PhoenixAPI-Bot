const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    name: 'help', 
    description: 'Muestra la lista de comandos u obtén información de un específico comando.',
    usage: '`'+prefix+'help {comando}`',
    permission: '`Ninguno`',
    async execute(bot, msg, args){
        if(args.length === 0) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle(bot.user.username + ' | Prefijo: `' + prefix + '`')
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
                .setDescription(`El comando {${args[0]}} no ha sido encontrado.`)
                .setTimestamp()
                .setFooter(msg.author.tag, msg.author.avatarURL())
            await msg.channel.send({embeds:[commandNotFound]})
            return;
        }
        
        const commandHelpEmbed = new Discord.MessageEmbed()
            .setDescription(`**Ayuda para el comando [${command.name.toLowerCase()}](https://github.com/Alex0622/PhoenixAPI-Bot/blob/main/ES/src/commands/${command.name}.js)**`)
            .setColor(config.embedColor)
            .addField('Descripción', command.description)
            .addField('Uso', command.usage)
            .addField('Permiso requerido', command.permission)
            .setTimestamp()
            .setFooter(msg.author.tag, msg.author.avatarURL())
        await msg.channel.send({embeds:[commandHelpEmbed]})
    }
}