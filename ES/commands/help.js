const Discord = require('discord.js');
const {prefix, embedColor, errorColor} = require('../config.json');

module.exports = {
    name: 'help', 
    description: 'Muestra la lista de comandos u obtén información de un específico comando.',
    usage: '`'+prefix+'help {comando}`',
    permission: '`Ninguno`',
    async execute(msg, args, bot){
        if(args.length === 0) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('PhoenixAPI | Prefijo: `' + prefix + '`')
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
                .setDescription(`El comando {${args[0]}} no ha sido encontrado.`)
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            );
            return;
        }
        
        const commandHelpEmbed = new Discord.MessageEmbed()
            .setDescription(`**Ayuda para el comando [${command.name.toUpperCase()}](https://github.com/Alex0622/PhoenixAPI-Bot/blob/main/commands/${command.name}.js)**`)
            .setColor(embedColor)
            .addField('Descripción', command.description)
            .addField('Uso', command.usage)
            .addField('Permiso requerido', command.permission)
            .setTimestamp()
            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL());
        await msg.channel.send(commandHelpEmbed);
    }
}