const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

module.exports = {
    name: 'info',
    description: 'Obtén información acerca del bot.',
    usage: '`'+prefix+'info`',
    permission: '`Ninguno`',
    async execute(bot, msg, args){
        try{
            const infoEmbed = new Discord.MessageEmbed()
            .setTitle(bot.user.tag)
            .setDescription('PhoenixAPI es un bot desarrollado con discord.js. El objetivo principal de este bot es la administración de servidores de [exaroton](https://exaroton.com/) usando la API de exaroton.')
            .setColor(config.embedColor)
            .setThumbnail(bot.user.displayAvatarURL())
            .addFields(
                {name:'Dueño', value:'`Alex22#7756`', inline:true},
                {name:'Desarrollado desde', value: '`21/1/2021`', inline:true},
                {name:'Desarrollado con', value:'`JavaScript & exaroton API`', inline:true},
                {name:'Versión actual', value:'[v4.3.0](https://github.com/Alex22sv/PhoenixAPI-Bot/releases/tag/v4.3.0)', inline:true},
                {name:'Prefijo', value:'`'+prefix+'`', inline:true},
                {name:'Enlaces', value:'[GitHub](https://github.com/Alex22sv/PhoenixAPI-Bot) | [Documentación de la API de exaroton](https://developers.exaroton.com/) | [Tutorial de instalación](https://www.youtube.com/watch?v=lYosqjZpIBE)', inline:false}
            )
            .setFooter(msg.author.tag, msg.author.avatarURL())
            await msg.channel.send({embeds:[infoEmbed]})
        } catch(e) {
            console.log(msg.content + ' | Usuario: ' + msg.author.tag)
            console.error(`Error al usar el comando "info": ${e.message}`)
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                .setColor(config.errorColor)
            await msg.channel.send({embeds:[errorEmbed]})
            return
        }
    }
}