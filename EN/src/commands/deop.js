const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'deop',
    description: 'Remove operators rights from players in Minecraft servers.',
    usage: '`'+prefix+'deop {server name|ID|address} {Minecraft player}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIdeop(){
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
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help deop`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{Minecraft player}** parameter. \n*Use ' + '`'+prefix+'help deop`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingPlayerEmbed]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let username  = args[1]
                let list = server.getPlayerList("ops")
                await list.deleteEntry(username)
                const deopEmbed = new Discord.MessageEmbed()
                    .setDescription(`Player **${username}** is no longer operator in Minecraft server **${server.name}**.`)
                    .setColor(config.embedColor) 
                await msg.channel.send({embeds:[deopEmbed]})
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "deop": ${e.message}`)
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
        APIdeop();
    }
}