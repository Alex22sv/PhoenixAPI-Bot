const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

module.exports = {
    name: 'info',
    description: 'Obtén información acerca del bot.',
    usage: '`'+prefix+'info`',
    permission: '`Ninguno`',
    execute(msg){
        try{
            const infoEmbed = new Discord.MessageEmbed()
            .setTitle('PhoenixAPI#4772')
            .setDescription('PhoenixAPI es un bot desarrollado con discord.js. El objetivo principal de este bot es la administración de servidores de [exaroton](https://exaroton.com/) usando la API de exaroton.')
            .setColor(embedColor)
            .setThumbnail('https://cdn.discordapp.com/avatars/803840147862454272/e35c5457abef496e3d8c0780bbef6e5d.webp?size=1024')
            .addFields(
                {name:'Dueño', value:'`Alex22#7756`', inline:true},
                {name:'Desarrollado desde', value: '`21/1/2021`', inline:true},
                {name:'Desarrollado con', value:'`JavaScript & exaroton API`', inline:true},
                {name:'Versión actual', value:'[v4.2.2](https://github.com/Alex0622/PhoenixAPI-Bot/releases/tag/v4.2.2)', inline:true},
                {name:'Prefijo', value:'`'+prefix+'`', inline:true},
                {name:'Enlaces', value:'[GitHub](https://github.com/Alex0622/PhoenixAPI-Bot) | [Documentación de la API de exaroton](https://support.exaroton.com/hc/en-us/articles/360019857878-API-documentation)', inline:false}
            )
            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            msg.channel.send(infoEmbed)
        } catch(e) {
            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
            console.error('Error al usar el comando "info": ' + e.message)
            const errorEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                .setColor(errorColor)
            msg.channel.send(errorEmbed)
        }
    }
}