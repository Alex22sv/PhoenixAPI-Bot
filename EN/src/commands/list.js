const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'list',
    description: 'Get player list contents of a server.',
    usage:'`'+prefix+'list {server name|ID|address} {banned/online/ops/whitelist}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIlist(){
            try{
                if(!msg.member.permissions.has("ADMINISTRATOR")){
                    const MissingPermissionsEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('You need the permission `Administrator` to use that command.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[MissingPermissionsEmbed]})
                    return
                }
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help list`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{list}** parameter. \n*Use ' + '`'+prefix+'help list`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingPlayerEmbed]})
                    return
                }
                let name = args[0];
                let list = args[1];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                if(list.toLowerCase() == "banned"){
                    let listBanned = server.getPlayerList("banned-players");
                    let entriesBanned = await listBanned.getEntries();
                    const listBannedEmbed = new Discord.MessageEmbed()
                        .setTitle('Banned players for server: ' + server.name)
                        .setDescription(entriesBanned.slice(0).join(', '))
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[listBannedEmbed]})
                    return
                }
                if(list.toLowerCase() == "online"){
                    if(server.players.count == 0){
                        const embedNoPlayers = new Discord.MessageEmbed() 
                            .setDescription(`There are no online players in server **${server.name}**.`)
                            .setColor(config.embedColor)
                            .setFooter(msg.author.tag, msg.author.avatarURL())
                        await msg.channel.send({embeds:[embedNoPlayers]})
                        return
                    } else{ 
                        console.log(server.players.list)
                        const embedPlayers = new Discord.MessageEmbed()                            
                            .setTitle('Online players in server: '+ server.name)
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
                        .setTitle('OPs players for server: ' + server.name)
                        .setDescription(entriesOps.slice(0).join(', '))
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[listOpsEmbed]})
                    return
                }
                if(list.toLowerCase() == "whitelist"){
                    let listWhitelist = server.getPlayerList("whitelist");
                    let entriesWhitelisted = await listWhitelist.getEntries();
                    const listWhitelistedEmbed = new Discord.MessageEmbed()
                        .setTitle('Whitelisted players for server: ' + server.name)
                        .setDescription(entriesWhitelisted.slice(0).join(', '))
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[listWhitelistedEmbed]})
                    return
                } else{
                    const PlayerlistNotFound = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('"'+list+'" is not a valid player list. \n*Use ' + '`'+prefix+'help list`' + ' for more information.*')
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[PlayerlistNotFound]})
                        return
                }
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "list": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'getPlayerList')"){
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`Server "${args[0]}" not found.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                } else{
                    const errorEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('An error occurred while running that command: `' + e.message + '`')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[errorEmbed]})
                    return
                }
            }
        }
        APIlist();

    }
}