const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    name: 'info',
    description: 'Get information about the bot.',
    usage: '`'+prefix+'info`',
    permission: '`None`',
    async execute(bot, msg, args){
        try{
            const infoEmbed = new Discord.MessageEmbed()
            .setTitle(bot.user.tag)
            .setDescription('PhoenixAPI is a bot developed with discord.js. The main reason of this bot is the managment of [exaroton](https://exaroton.com/) servers using the exaroton API.')
            .setColor(config.embedColor)
            .setThumbnail(bot.user.displayAvatarURL())
            .addFields(
                {name:'Owner', value:'`Alex22#7756`', inline:true},
                {name:'Developed since', value: '`21/1/2021`', inline:true},
                {name:'Developed with', value:'`JavaScript & exaroton API`', inline:true},
                {name:'Current version', value:'[v4.3.0](https://github.com/Alex22sv/PhoenixAPI-Bot/releases/tag/v4.3.0)', inline:true},
                {name:'Prefix', value:'`'+prefix+'`', inline:true},
                {name:'Links', value:'[GitHub](https://github.com/Alex22sv/PhoenixAPI-Bot) | [exaroton API documentation](https://developers.exaroton.com/)', inline:false}
            )
            .setFooter(msg.author.tag, msg.author.avatarURL())
            await msg.channel.send({embeds:[infoEmbed]})
        } catch(e) {
            console.log(msg.content + ' | User: ' + msg.author.tag)
            console.error('Error while using "info" command: ' + e.message)
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('An error occurred while running that command: `' + e.message + '`')
                .setColor(config.errorColor)
            await msg.channel.send({embeds:[errorEmbed]})
        }
    }
}