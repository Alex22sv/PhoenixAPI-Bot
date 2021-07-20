const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'ram',
    description: 'Get/Change the server RAM.', 
    usage: 'Get RAM: `'+prefix+'ram {server name|ID|address} get` \nChange RAM: `'+prefix+'ram {server name|ID|address} set {2-16}`',
    permission: '`ADMINISTRATOR`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Your message does not include an exaroton server.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }

        if(args[0] != undefined){
            if(msg.member.hasPermission('ADMINISTRATOR')){
                async function APIram() {
                    if(args[1] == undefined){
                        const errorRAMembed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Your message does not include the {get/set} parameter. \nUse `'+prefix+'help ram` for more information.')
                            .setColor(errorColor)
                        msg.channel.send(errorRAMembed)
                        return
                    }
                    if(args[1].toLowerCase() == 'get'){
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let serverRAM = await server.getRAM();
                            const serverRAMembed = new Discord.MessageEmbed()
                                .setDescription(`RAM for server **${server.name}**: ${serverRAM}GB`)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(serverRAMembed);
                        } catch (e) {
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "ram" command: '+ e.message);
                            if(e.message == "Cannot read property 'getRAM' of undefined") {
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
                    } else if(args[1].toLowerCase() == 'set'){
                        if(args[2] == undefined){
                            const notRAMdefined = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Your message does not include the "RAM" parameter. \nUse `'+prefix+'help ram` for more information.')
                                .setColor(errorColor)
                            msg.channel.send(notRAMdefined)
                            return
                        } else{
                            try {
                                let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                                let serverRAM = await server.getRAM()
                                await server.setRAM(args[2]);     
                                const ramChangedEmbed = new Discord.MessageEmbed()
                                    .setDescription(`RAM for server **${server.name}** has changed from ${serverRAM}GB to ${args[2]}GB.`)  
                                    .setColor(embedColor)   
                                    .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())                     
                                msg.channel.send(ramChangedEmbed)
                                console.log(msg.author.username+'#'+msg.author.discriminator + `has changed the server RAM of server "${args[0]}" from ${serverRAM}GB to ${args[2]}GB.`)
                            } catch (e) {
                                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                                console.error('Error while using "ram" command: ' +e.message);
                                if(e.message == "Cannot read property 'getRAM' of undefined") {
                                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                                        .setTitle('Error!')
                                        .setDescription(`Server "${args[0]}" not found.`)
                                        .setColor(errorColor)
                                    msg.channel.send(serverNotFoundEmbed)
                                }
                                else if(e.message == "Ram must be in range 2 <= ram <= 16"){
                                    const notValidParameter = new Discord.MessageEmbed()
                                        .setTitle('Error!')
                                        .setDescription('RAM must be in range of 2-16.')
                                        .setColor(errorColor)
                                    msg.channel.send(notValidParameter)
                                } else{
                                    const errorEmbed = new Discord.MessageEmbed()
                                        .setTitle('Error!')
                                        .setDescription('An error occurred while running that command: `' + e.message + '`')
                                        .setColor(errorColor)
                                    msg.channel.send(errorEmbed)
                                }
                            }
                        }
                    } else{
                        const optionNotFound = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('"'+args[1]+'" is not a valid option about RAM. \nUse `'+prefix+ 'help ram` for more information.')
                            .setColor(errorColor)
                        msg.channel.send(optionNotFound)
                        return
                    }
                }
                APIram();
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
}
