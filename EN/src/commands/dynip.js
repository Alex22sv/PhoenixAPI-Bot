const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'dynip',
    description: "Get the server's DynIP.",
    usage: '`'+prefix+'dynip {server name|ID|address}`',
    permission: '`None`',
    execute(bot, msg, args){
        async function APIdynip(){
            try{
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help dynip`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                await server.get();
                if(server.host == null){
                    const errorDynipEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription("I can't get the DynIP of that server because it's not online.")
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[errorDynipEmbed]})
                        return
                }
                const DynipEmbed = new Discord.MessageEmbed()
                    .setDescription('DynIP for server **' + server.name + '**: `' + server.host + ':' +server.port + '`')
                    .setColor(config.embedColor)
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                await msg.channel.send({embeds:[DynipEmbed]})
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "dynip": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'get')"){
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
        APIdynip();
    }
}