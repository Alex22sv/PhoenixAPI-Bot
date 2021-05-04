const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'log',
    description: 'Upload a server log to https://mclo.gs/.',
    usage: '`'+prefix+'log {server name}`',
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
                async function APIlog() {
                    try{
                        let name = args[0];
                        let serverLists = await exarotonClient.getServers();
                        let server = serverLists.find(server => server.name === name);
                        let logs = await server.shareLogs();
                        const logsEmbed = new Discord.MessageEmbed()
                            .setDescription(`Log for server **${server.name}**: ${logs}`)
                            .setColor(embedColor)
                        msg.channel.send(logsEmbed)
                    } catch (e) {
                        console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        console.error('An error occurred while using "log" command: '+ e.message);
                        if(e.message == "Required POST argument 'content' is empty.") {
                            const emptyLogEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('That server log is empty.')
                                .setColor(errorColor)
                            msg.channel.send(emptyLogEmbed)
                        }
                        else if(e.message == "Cannot read property 'shareLogs' of undefined") {
                            const serverNotFoundEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription(`Server ${args[0]} not found.`)
                                .setColor(errorColor)
                            msg.channel.send(serverNotFoundEmbed)
                        } else {
                            const errorEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('An error occurred while running that command: `' + e.message + '`')
                                .setColor(errorColor)
                            msg.channel.send(errorEmbed)
                        }
                    }
                }
                APIlog();
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