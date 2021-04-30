const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'execute',
    description: 'Execute Minecraft commands through the API.',
    usage: '`'+prefix+'execute {server name} {command}`',
    permission: '`ADMINISTRATOR`',
    execute(msg, args){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            if(args[0] == undefined) {
                const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Your message does not include an exaroton server.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
            return
            }
    
            if(args[0] != undefined) {
                if(args[1] == undefined){
                    const notCommandEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the {command} parameter. \n Use `'+prefix+'help execute` for more information.')
                        .setColor(errorColor)
                    msg.channel.send(notCommandEmbed)
                    console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                    return
                } else {
                    async function APIExecute() {
                        let name = args[0];
                        let serverLists = await exarotonClient.getServers();
                        let server = serverLists.find(server => server.name === name);
                        try {
                            await server.executeCommand('say Executing commands through API...');
                            await server.executeCommand(args.slice(1).join(' '))
                            await server.executeCommand('save-all');
                            const executeEmbed = new Discord.MessageEmbed()
                                .setDescription('Commands executed successfully.')
                                .setColor(embedColor)
                            msg.channel.send(executeEmbed)
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        } catch (e) {
                            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "execute" command: '+ e.message);
                            if(e.message == 'Server is not online') {
                                const serverNotOnlineEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription('This is only possible when your server is online.')
                                    .setColor(errorColor)
                                msg.channel.send(serverNotOnlineEmbed)
                            }
                            else if(e.message == "Cannot read property 'executeCommand' of undefined") {
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
                    APIExecute();      
                }

            }

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