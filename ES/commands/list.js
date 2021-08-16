const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'list',
    description: 'Obtén los jugadores en una lista.',
    usage:'`'+prefix+'list {nombre|ID|dirección del servidor} {banned/ops/players/whitelist}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help list` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                async function APIlist(){
                    if(args[1] == undefined){
                        const notPlayerList = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Tu mensaje no incluye una lista de jugadores. \nUsa `'+prefix+'help list` para más información.')
                            .setColor(errorColor)
                        msg.channel.send(notPlayerList)
                        return
                    }
                    if(args[1].toLowerCase() == 'banned'){
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let listBanned = server.getPlayerList("banned-players");
                            let entriesBanned = await listBanned.getEntries();
                            const listBannedEmbed = new Discord.MessageEmbed()
                                .setTitle('Jugadores baneados en el servidor: ' + server.name)
                                .setDescription(entriesBanned)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(listBannedEmbed);
                            return
                        } catch (e) {
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error al usar el comando "list": '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
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
                    else if(args[1].toLowerCase() == 'ops') {
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let listOps = server.getPlayerList("ops");
                            let entriesOps = await listOps.getEntries();
                            const listOpsEmbed = new Discord.MessageEmbed()
                                .setTitle('Administradores en el servidor: ' + server.name)
                                .setDescription(entriesOps)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(listOpsEmbed);
                            return
                        } catch (e) {
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error al usar el comando "list": '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
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
                    else if(args[1].toLowerCase() == 'players') {
                        try{
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            if(server.players.count != 0){ 
                                const embedPlayers = new Discord.MessageEmbed()                            
                                    .setTitle('Jugadores en línea en el servidor: '+ server.name)
                                    .setDescription(server.players.list)
                                    .setColor(embedColor)
                                    .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                                msg.channel.send(embedPlayers)
                            }
                            if(server.players.count == 0){
                                const embedNoPlayers = new Discord.MessageEmbed() 
                                    .setDescription(`No hay jugadores actualmente en el servidor **${server.name}**.`)
                                    .setColor(embedColor)
                                msg.channel.send(embedNoPlayers)
                            }
                        } catch (e){
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error al usar el comando "list": '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
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
                    else if(args[1].toLowerCase() == 'whitelist') {
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let listWhitelist = server.getPlayerList("whitelist");
                            let entriesWhitelisted = await listWhitelist.getEntries();
                            const listWhitelistedEmbed = new Discord.MessageEmbed()
                                .setTitle('Jugadores en la lista blanca en el servidor:  ' + server.name)
                                .setDescription(entriesWhitelisted)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(listWhitelistedEmbed);
                            return
                        } catch (e) {
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error al usar el comando "list": '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
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
                    } else{
                        const PlayerlistNotFound = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('"'+args[1]+'" no es una lista de jugadores válida. \nUsa `'+prefix+ 'help list` para más información.')
                            .setColor(errorColor)
                        msg.channel.send(PlayerlistNotFound)
                        return
                    }
                }
                APIlist();
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