const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'whitelist',
    description: 'Añade jugadores a la lista blanca o remueve jugadores de ella.',
    usage: '`'+prefix+'whitelist {nombre|ID|dirección del servidor} {add/remove} {Minecraft player}`',
    permission: 'Añadir jugadores: `Ninguno` \n Remover jugadores: `ADMINISTRADOR`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help whitelist` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined){
                if(args[1] == undefined){
                    const notOptionMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Especifica si quieres añadir o quitar a alguien de la lista blanca. \n Usa `'+prefix+'help whitelist` para más información.')
                        .setColor(errorColor)
                    msg.channel.send(notOptionMentioned)
                    return
                    }
                else if(args[1] == 'add'){
                    if(args[2] == undefined){
                        const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye un jugador de Minecraft. \n Usa `'+prefix+'help whitelist` para más información.')
                        .setColor(errorColor)
                    msg.channel.send(missingPlayerEmbed)
                    }else{
                        async function APIWhitelistAdd(){
                            try {
                                let name = args[0];
                                let serverLists = await exarotonClient.getServers();
                                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name)
                                let username  = args[2]
                                let list = server.getPlayerList("whitelist")
                                await list.addEntry(username)
                                const playerWhitelistAddedEmbed = new Discord.MessageEmbed()
                                    .setDescription(`El jugador **${username}** ahora está en la lista blanca del servidor **${server.name}**.`)
                                    .setColor(embedColor) 
                                msg.channel.send(playerWhitelistAddedEmbed)
                                console.log(`${msg.author.username}#${msg.author.discriminator} añadió a ${username} a la lista blanca del servidor ${server.name}`)
                            } catch (e) {
                                console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                                console.error('Error al usar el comando "whitelist": ' + e.message)
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
                        APIWhitelistAdd();
                    }
                }
                else if(args[1] == 'remove') {
                    if(msg.member.hasPermission('ADMINISTRATOR')){
                        if(args[2] == undefined){
                            const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye un jugador de Minecraft. \n Usa `'+prefix+'help whitelist` para más información.')
                        .setColor(errorColor)
                    msg.channel.send(missingPlayerEmbed)
                        } else{
                            async function APIWhitelistRemove(){
                                try {
                                    let name = args[0];
                                    let serverLists = await exarotonClient.getServers();
                                    let server = serverLists.find(server => server.name === name);
                                    let username  = args[2]
                                    let list = server.getPlayerList("whitelist")
                                    await list.deleteEntry(username)
                                    const playerWhitelistRemovedEmbed = new Discord.MessageEmbed()
                                        .setDescription(`El jugador **${username}** ya no se encuentra en la lista blanca del servidor **${server.name}**.`)
                                        .setColor(embedColor) 
                                    msg.channel.send(playerWhitelistRemovedEmbed)
                                    console.log(`${msg.author.username}#${msg.author.discriminator} quitó a ${username} de la lista blanca del servidor ${server.name}`)
                                } catch (e) {
                                    console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                                    console.error('Error al usar el comando "whitelist": ' + e.message)
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
                            APIWhitelistRemove();
                        }
                    }
                    if(!msg.member.hasPermission('ADMINISTRATOR'))  {
                        const MissingPermissionsEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Necesitas el permiso `Administrador` para ejecutar ese comando.')
                            .setColor(errorColor)
                        msg.channel.send(MissingPermissionsEmbed)
                    }
                } else{
                    const optionNotFound = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('"'+args[1]+'" no es una opción válida. \nUsa `'+prefix+ 'help whitelist` para más información.')
                        .setColor(errorColor)
                    msg.channel.send(optionNotFound)
                    return
                }
        }
    }
}