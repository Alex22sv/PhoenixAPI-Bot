const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'dynip',
    description: "Obtén la DynIP (IP dinámica) del servidor.",
    usage: '`'+prefix+'dynip {nombre|ID|dirección del servidor}`',
    permission: '`Ninguno`',
    execute(msg, args){
        if(args[0] == undefined) {
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help dynip` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined) {
            async function APIDynIP() {
                try {
                    let name = args[0];
                    let serverLists = await exarotonClient.getServers();
                    let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                    await server.get();
                    if(server.host == null){
                        const errorDynipEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription("No puedo obtener la IP dinámica de ese servidor porque está apagado.")
                            .setColor(errorColor)
                        msg.channel.send(errorDynipEmbed)
                    }
                    if(server.host != null){
                        const DynipEmbed = new Discord.MessageEmbed()
                            .setDescription('La IP dinámica del servidor **' + server.name + '** es: `' + server.host + ':' +server.port + '`')
                            .setColor(embedColor)
                            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                        msg.channel.send(DynipEmbed)
                    }
                }catch (e) {
                    console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                    console.error('Error al usar el comando "dynip": ' + e.message)
                    if(e.message == "Cannot read property 'get' of undefined"){
                        const serverNotFoundEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                            .setColor(errorColor)
                        msg.channel.send(serverNotFoundEmbed)
                    } else{
                        const errorEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                                .setColor(errorColor)
                            msg.channel.send(errorEmbed)
                    }
                }
            }
            APIDynIP();
        }
    }
}