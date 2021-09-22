const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'start',
    description: 'Start a Minecraft server.',
    usage: '`'+prefix+'start {server name|ID|address}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIstart(){
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
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help start`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                try{
                    let url = await server.shareLogs();
                    await server.start();
                    const serverStartingEmbed = new Discord.MessageEmbed()
                        .setDescription(`${config.loadingEmoji} Starting server **${server.name}**\nServer log: `+url)
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[serverStartingEmbed]}) 
                } catch(e){
                    if(e.message == "Log file is empty or does not exist"){
                        let url = "`Empty log or does not exist.`"
                        await server.start();
                        const serverStartingEmbed = new Discord.MessageEmbed()
                            .setDescription(`${config.loadingEmoji} Starting server **${server.name}**\nServer log: `+url)
                            .setColor(config.embedColor)
                            .setFooter(msg.author.tag, msg.author.avatarURL())
                        await msg.channel.send({embeds:[serverStartingEmbed]}) 
                    }
                }
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "start": ${e.message}`)
                if(e.message == 'Server is not offline') {
                    const serverNotOfflineEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('This is only possible when your server is offline.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotOfflineEmbed]})
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
        APIstart();
    }
}