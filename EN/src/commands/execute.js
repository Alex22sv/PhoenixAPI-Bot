const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'execute',
    description: 'Execute Minecraft commands through the API.',
    usage: '`'+prefix+'execute {server name|ID|address} {Minecraft command}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIexecute(){
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
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help execute`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{Minecraft command}** parameter. \n*Use ' + '`'+prefix+'help execute`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingPlayerEmbed]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let MinecraftCommand = args.slice(1).join(' ')
                await server.executeCommand('/say Executing commands through API...');
                await server.executeCommand(MinecraftCommand)
                await server.executeCommand('/save-all');
                const executeEmbed = new Discord.MessageEmbed()
                    .setDescription(`Command \`${MinecraftCommand}\` executed successfully.`)
                    .setColor(config.embedColor)
                    await msg.channel.send({embeds:[executeEmbed]})
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "execute": ${e.message}`)
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
        APIexecute();
    }
}