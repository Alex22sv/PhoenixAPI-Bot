const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'stop',
    description: 'Stop a Minecraft server.',
    usage: '`'+prefix+'stop {server name|ID|address}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIstop(){
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
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help stop`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                await server.executeCommand('say [exaroton API] This server will be stopped in a few seconds.');
                let url = await server.shareLogs();
                await server.stop();
                const serverStoppingEmbed = new Discord.MessageEmbed()
                    .setDescription(`${config.loadingEmoji} Stopping server **${server.name}**\nServer log: `+url)
                    .setColor(config.embedColor)
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                await msg.channel.send({embeds:[serverStoppingEmbed]}) 
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "stop": ${e.message}`)
                if(e.message == 'Server is not online') {
                    const serverNotOnlineEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('This is only possible when your server is online.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotOnlineEmbed]})
                    return
                }
                if(e.message === "Cannot read properties of undefined (reading 'executeCommand')"){
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
        APIstop();
    }
}