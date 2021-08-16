const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'op',
    description: 'Garantiza permisos de administrador a un jugador en Minecraft.',
    usage: '`'+prefix+'op {nombre|ID|dirección del servidor} {Usuario de Minecraft}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help op` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined){
            if(msg.member.hasPermission('ADMINISTRATOR')){
                if(args[1] == undefined){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye un jugador de Minecraft. \n Usa `'+prefix+'help op` para más información.')
                        .setColor(errorColor)
                    msg.channel.send(missingPlayerEmbed)
                    return
                } else{
                    async function APIop(){  
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let username  = args[1]
                            let list = server.getPlayerList("ops")
                            await list.addEntry(username)
                            const playerOppedEmbed = new Discord.MessageEmbed()
                                .setDescription(`El jugador **${username}** ahora tiene permisos de administrador en el servidor **${server.name}**.`)
                                .setColor(embedColor) 
                            msg.channel.send(playerOppedEmbed)
                            console.log(`${msg.author.username}#${msg.author.discriminator} dio permisos de administrador a ${username} en el servidor ${server.name}`)
                        } catch (e) {
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error while using "op" command: ' + e.message)
                            if(e.message == "Cannot read property 'getPlayerList' of undefined"){
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
                    APIop();
                }
            }
            if(!msg.member.hasPermission('ADMINISTRATOR'))  {
                const MissingPermissionsEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Necesitas el permiso `Administrador` para ejecutar ese comando.')
                    .setColor(errorColor)
                msg.channel.send(MissingPermissionsEmbed)
            }
        }
    }
}