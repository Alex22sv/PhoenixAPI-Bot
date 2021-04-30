const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'list',
    description: 'Get player list contents.',
    usage:'`'+prefix+'list {server name} {banned/op/players/whitelist}`',
    permission: '`ADMINISTRATOR`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Your message does not include an exaroton server.')
                .setColor(errorColor)
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                async function APIlist(){
                    let name = args[0];
                    let serverLists = await exarotonClient.getServers();
                    let server = serverLists.find(server => server.name === name);
                    if(args[1] == undefined){
                        const notPlayerList = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Your message does not include the {player list} parameter. \nUse `'+prefix+'help list` for more information.')
                            .setColor(errorColor)
                        msg.channel.send(notPlayerList)
                        console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        return
                    }
                    if(args[1].toLowerCase() == 'banned'){
                        try {
                            let listBanned = server.getPlayerList("banned-players");
                            let entriesBanned = await listBanned.getEntries();
                            const listBannedEmbed = new Discord.MessageEmbed()
                                .setTitle('Banned players for server: ' + args[0])
                                .setDescription(entriesBanned)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(listBannedEmbed);
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            return
                        } catch (e) {
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "list" command: '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
                                const serverNotFoundEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription('Server not found.')
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
                    else if(args[1].toLowerCase() == 'ops') {
                        try {
                            let listOps = server.getPlayerList("ops");
                            let entriesOps = await listOps.getEntries();
                            const listOpsEmbed = new Discord.MessageEmbed()
                                .setTitle('OPs players for server: ' + args[0])
                                .setDescription(entriesOps)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(listOpsEmbed);
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            return
                        } catch (e) {
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "list" command: '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
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
                    else if(args[1].toLowerCase() == 'players') {
                        try{
                            if(server.players.count != 0){ 
                                const embedPlayers = new Discord.MessageEmbed()                            
                                    .setTitle('Online players in server: '+ server.name)
                                    .setDescription(server.players.list)
                                    .setColor(embedColor)
                                    .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                                msg.channel.send(embedPlayers)
                                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            }
                            if(server.players.count == 0){
                                const embedNoPlayers = new Discord.MessageEmbed() 
                                    .setDescription(`There are no players playing in server **${server.name}**.`)
                                    .setColor(embedColor)
                                msg.channel.send(embedNoPlayers)
                                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            }
                        } catch (e){
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "list" command: '+ e.message);
                            if(e.message == "Cannot read property 'players' of undefined"){
                                const serverNotFoundEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription(`Server "${args[0]}" not found.`)
                                    .setColor(errorColor)
                                msg.channel.send(serverNotFoundEmbed) 
                            }  

                            else{
                                const errorEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription('An error occurred while running that command: `' + e.message + '`')
                                    .setColor(errorColor)
                                msg.channel.send(errorEmbed)
                            }
                        }
                    }
                    else if(args[1].toLowerCase() == 'whitelist') {
                        try {
                            let listWhitelist = server.getPlayerList("whitelist");
                            let entriesWhitelisted = await listWhitelist.getEntries();
                            const listWhitelistedEmbed = new Discord.MessageEmbed()
                                .setTitle('Whitelisted players for server: ' + args[0])
                                .setDescription(entriesWhitelisted)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(listWhitelistedEmbed);
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            return
                        } catch (e) {
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "list" command: '+ e.message);
                            if(e.message == "Cannot read property 'getPlayerList' of undefined") {
                                const serverNotFoundEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription(`Server "${args[0]}" not found.`)
                                    .setColor(errorColor)
                                msg.channel.send(serverNotFoundEmbed)
                            }

                            else{
                                const errorEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription('An error occurred while running that command: `' + e.message + '`')
                                    .setColor(errorColor)
                                msg.channel.send(errorEmbed)
                            }
                        }
                    } else{
                        const PlayerlistNotFound = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('"'+args[1]+'" is not a valid player list. \nUse `'+prefix+ 'help list` for more information.')
                            .setColor(errorColor)
                        msg.channel.send(PlayerlistNotFound)
                        console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        return
                    }
                }
                APIlist();
            }
            if(!msg.member.hasPermission('ADMINISTRATOR'))  {
                const MissingPermissionsEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('You need the permission `Administrator` to use that command.')
                    .setColor(errorEmbed)
                msg.channel.send(MissingPermissionsEmbed)
                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
            }
        }

    }
}