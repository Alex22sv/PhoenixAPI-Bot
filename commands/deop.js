const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'deop',
    description: 'Remove operators rights from players in Minecraft servers.',
    usage: '`'+prefix+'deop {server name|ID|address} {Minecraft player}',
    permission: '`ADMINISTRATOR`',
    execute(msg, args){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(args[0] == undefined){
                const notSeverMentioned = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Your message does not include an exaroton server.')
                    .setColor(errorColor)
                msg.channel.send(notSeverMentioned)
                return
            }
            if(args[0] != undefined){
                if(args[1] == undefined){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the {Minecraft player} parameter. \n Use `'+prefix+'help deop` for more information.')
                        .setColor(errorColor)
                    msg.channel.send(missingPlayerEmbed)
                    return
                } else{
                    async function APIdeop(){  
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let username  = args[1]
                            let list = server.getPlayerList("ops")
                            await list.deleteEntry(username)
                            const playerDeoppedEmbed = new Discord.MessageEmbed()
                                .setDescription(`Player **${username}** is no longer operator in Minecraft server **${server.name}**.`)
                                .setColor(embedColor) 
                            msg.channel.send(playerDeoppedEmbed)
                            console.log(`${msg.author.username}#${msg.author.discriminator} deopped ${username} in server ${server.name}`)
                        } catch (e) {
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error while using "deop" command: ' + e.message)
                            if(e.message == "Cannot read property 'getPlayerList' of undefined"){
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
                    APIdeop();
                }
            } 
        }
        if(!msg.member.hasPermission('ADMINISTRATOR'))  {
            const MissingPermissionsEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('You need the permission `Administrator` to use that command.')
                .setColor(errorColor)
            msg.channel.send(MissingPermissionsEmbed)
        }
    }
}