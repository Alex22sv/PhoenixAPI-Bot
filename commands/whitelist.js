const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'whitelist',
    description: 'Add Minecraft players to the whitelist or remove players from it.',
    usage: '`'+prefix+'whitelist {server name} {add/remove} {Minecraft player}`',
    permission: 'Whitelist players: `None` \n Remove players from whitelist: `ADMINISTRATOR`',
    execute(msg, args){
        if(args[0] == undefined) {
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Your message does not include an exaroton server.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined){
                if(args[1] == undefined){
                    const notOptionMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the {add/remove} parameter. \n Use `'+prefix+'help whitelist` for more information.')
                        .setColor(errorColor)
                    msg.channel.send(notOptionMentioned)
                    return
                    }
                else if(args[1] == 'add'){
                    if(args[2] == undefined){
                        const missingPlayerEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Your message does not include the "Minecraft player" parameter. \n Use `'+prefix+'help whitelist` for more information.')
                            .setColor(errorColor)
                        msg.channel.send(missingPlayerEmbed)
                    }else{
                        async function APIWhitelistAdd(){
                            try {
                                let name = args[0];
                                let serverLists = await exarotonClient.getServers();
                                let server = serverLists.find(server => server.name === name);
                                let username  = args[2]
                                let list = server.getPlayerList("whitelist")
                                await list.addEntry(username)
                                const playerWhitelistAddedEmbed = new Discord.MessageEmbed()
                                    .setDescription(`Player **${username}** is now whitelisted in Minecraft server **${server.name}**.`)
                                    .setColor(embedColor) 
                                msg.channel.send(playerWhitelistAddedEmbed)
                                console.log(`${msg.author.username}#${msg.author.discriminator} added ${username} to whitelist in server ${server.name}`)
                            } catch (e) {
                                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                                console.error('Error while using "whitelist" command: ' + e.message)
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
                        APIWhitelistAdd();
                    }
                }
                else if(args[1] == 'remove') {
                    if(msg.member.hasPermission('ADMINISTRATOR')){
                        if(args[2] == undefined){
                            const missingPlayerEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Your message does not include the "Minecraft player" parameter. \n Use `'+prefix+'help whitelist` for more information.')
                                .setColor(errorColor)
                            msg.channel.send(missingPlayerEmbed)
                        } else{
                            async function APIWhitelistRemove(){
                                try {
                                    let name = args[0];
                                    let serverLists = await exarotonClient.getServers();
                                    let server = serverLists.find(server => server.name === name);
                                    let username  = args[2]
                                    let list = server.getPlayerList("whitelist")
                                    await list.deleteEntry(username)
                                    const playerWhitelistRemovedEmbed = new Discord.MessageEmbed()
                                        .setDescription(`Player **${username}** was removed from whitelist in Minecraft server **${server.name}**.`)
                                        .setColor(embedColor) 
                                    msg.channel.send(playerWhitelistRemovedEmbed)
                                    console.log(`${msg.author.username}#${msg.author.discriminator} removed ${username} from whitelist in server ${server.name}`)
                                } catch (e) {
                                    console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                                    console.error('Error while using "whitelist" command: ' + e.message)
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
                            APIWhitelistRemove();
                        }
                    }
                    if(!msg.member.hasPermission('ADMINISTRATOR'))  {
                        const MissingPermissionsEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('You need the permission `Administrator` to use that command.')
                            .setColor(errorColor)
                        msg.channel.send(MissingPermissionsEmbed)
                    }
                } else{
                    const optionNotFound = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('"'+args[1]+'" is not a valid option. \nUse `'+prefix+ 'help whitelist` for more information.')
                        .setColor(errorColor)
                    msg.channel.send(optionNotFound)
                    return
                }
        }
    }
}