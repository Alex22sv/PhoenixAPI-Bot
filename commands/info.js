const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

module.exports = {
    name: 'info',
    description: 'Get information about the bot.',
    usage: '`'+prefix+'info`',
    permission: '`None`',
    execute(msg){
        try{
            const infoEmbed = new Discord.MessageEmbed()
            .setTitle('PhoenixAPI#4772')
            .setDescription('PhoenixAPI is a bot developed with discord.js. The main reason of this bot is the managment of [exaroton](https://exaroton.com/) servers using the exaroton API.')
            .setColor(embedColor)
            .setThumbnail('https://cdn.discordapp.com/avatars/803840147862454272/e35c5457abef496e3d8c0780bbef6e5d.webp?size=1024')
            .addFields(
                {name:'Owner', value:'`Alex22#7756`', inline:true},
                {name:'Developed since', value: '`21/1/2021`', inline:true},
                {name:'Developed with', value:'`JavaScript & exaroton API`', inline:true},
                {name:'Current version', value:'[v4.1](https://github.com/Alex0622/PhoenixAPI-Bot/releases/tag/v4.1)', inline:true},
                {name:'Prefix', value:'`'+prefix+'`', inline:true},
                {name:'Links', value:'[GitHub](https://github.com/Alex0622/PhoenixAPI-Bot) | [exaroton API documentation](https://support.exaroton.com/hc/en-us/articles/360019857878-API-documentation)', inline:false}
            )
            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            msg.channel.send(infoEmbed)
        } catch(e) {
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
            console.error('Error while using "info" command: ' + e.message)
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('An error occurred while running that command: `' + e.message + '`')
                .setColor(errorColor)
            msg.channel.send(errorEmbed)
        }
    }
}