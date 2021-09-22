const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'list',
    description: 'Obtén los jugadores en una lista.',
    usage:'`'+prefix+'list {nombre|ID|dirección del servidor} {baneados/ops/jugadores/listablanca}`',
    permission: '`ADMINISTRADOR`',
    execute(bot, msg, args){
        async function APIlist(){
            try{
                if(!msg.member.permissions.has("ADMINISTRATOR")){
                    const MissingPermissionsEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Necesitas el permiso `Administrador` para ejecutar ese comando.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[MissingPermissionsEmbed]})
                    return
                }
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help list`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{lista}**. \n*Usa ' + '`'+prefix+'help list`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingPlayerEmbed]})
                    return
                }
                let name = args[0];
                let list = args[1];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                if(list.toLowerCase() == "baneados"){
                    let listBanned = server.getPlayerList("banned-players");
                    let entriesBanned = await listBanned.getEntries();
                    const listBannedEmbed = new Discord.MessageEmbed()
                        .setTitle('Jugadores baneados en el servidor: ' + server.name)
                        .setDescription(entriesBanned.slice(0).join(', '))
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[listBannedEmbed]})
                    return
                }
                if(list.toLowerCase() == "jugadores"){
                    if(server.players.count == 0){
                        const embedNoPlayers = new Discord.MessageEmbed() 
                            .setDescription(`No hay jugadores en línea en el servidor **${server.name}**.`)
                            .setColor(config.embedColor)
                            .setFooter(msg.author.tag, msg.author.avatarURL())
                        await msg.channel.send({embeds:[embedNoPlayers]})
                        return
                    } else{ 
                        const embedPlayers = new Discord.MessageEmbed()                            
                            .setTitle('Jugadores en línea en el servidor: '+ server.name)
                            .setDescription(server.players.list.slice(0).join(', '))
                            .setColor(config.embedColor)
                            .setFooter(msg.author.tag, msg.author.avatarURL())
                        await msg.channel.send({embeds:[embedPlayers]})
                        return
                    }
                }
                if(list.toLowerCase() == "ops"){
                    let listOps = server.getPlayerList("ops");
                    let entriesOps = await listOps.getEntries();
                    const listOpsEmbed = new Discord.MessageEmbed()
                        .setTitle('Jugadores administradores en el servidor: ' + server.name)
                        .setDescription(entriesOps.slice(0).join(', '))
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[listOpsEmbed]})
                    return
                }
                if(list.toLowerCase() == "listablanca"){
                    let listWhitelist = server.getPlayerList("whitelist");
                    let entriesWhitelisted = await listWhitelist.getEntries();
                    const listWhitelistedEmbed = new Discord.MessageEmbed()
                        .setTitle('Jugadores en la lista blanca del servidor: ' + server.name)
                        .setDescription(entriesWhitelisted.slice(0).join(', '))
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[listWhitelistedEmbed]})
                    return
                } else{
                    const PlayerlistNotFound = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('"'+list+'" no es una lista válida. \n*Usa ' + '`'+prefix+'help list`' + ' para más información.*')
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[PlayerlistNotFound]})
                        return
                }
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "list": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'getPlayerList')"){
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                } else{
                    const errorEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[errorEmbed]})
                    return
                }
            }
        }
        APIlist();

    }
}