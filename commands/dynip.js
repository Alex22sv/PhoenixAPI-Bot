const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'dynip',
    description: "Get the server's DynIP.",
    usage: '`'+prefix+'dynip {server name|ID|address}`',
    permission: '`None`',
    execute(msg, args){
        if(args[0] == undefined) {
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Your message does not include an exaroton server.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined) {
            async function APIDynIP() {
                try {
                    let name = args[0];
                    let serverLists = await exarotonClient.getServers();
                    let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                    await server.get();
                    if(server.host == null){
                        const errorDynipEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription("I can't get the DynIP of that server because it's not online.")
                            .setColor(errorColor)
                        msg.channel.send(errorDynipEmbed)
                    }
                    if(server.host != null){
                        const DynipEmbed = new Discord.MessageEmbed()
                            .setDescription('DynIP for server **' + server.name + '**: `' + server.host + ':' +server.port + '`')
                            .setColor(embedColor)
                            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                        msg.channel.send(DynipEmbed)
                    }
                }catch (e) {
                    console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                    console.error('Error while using "dynip" command: ' + e.message)
                    if(e.message == "Cannot read property 'get' of undefined"){
                        const serverNotFoundEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(`Server "${args[0]}" not found.`)
                            .setColor(errorColor)
                        msg.channel.send(serverNotFoundEmbed)
                    } else{
                        const errorEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('An error occurred while running that command: `' + e.message + '`')
                            .setColor(errorColor)
                        msg.channel.send(errorEmbed)
                    }
                }
            }
            APIDynIP();
        }
    }
}