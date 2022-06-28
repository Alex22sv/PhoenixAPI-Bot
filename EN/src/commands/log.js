const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'log',
    description: 'Upload a server log to https://mclo.gs/.',
    usage: '`'+prefix+'log {server name|ID|address}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIlog(){
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
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help log`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let logs = await server.shareLogs();
                const logsEmbed = new Discord.MessageEmbed()
                    .setDescription(`Log for server **${server.name}**: ${logs}`)
                    .setColor(config.embedColor)
                await msg.channel.send({embeds:[logsEmbed]})
                return
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "log": ${e.message}`)
                if(e.message == "Log file is empty or does not exist"){
                    const emptyLogEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('That server log is empty or does not exist.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[emptyLogEmbed]})
                    return
                }
                if(e.message === "Cannot read properties of undefined (reading 'shareLogs')"){
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
        APIlog();
    }
}