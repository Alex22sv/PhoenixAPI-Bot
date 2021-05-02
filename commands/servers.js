const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'servers',
    description: 'List all servers from your exaroton account.',
    usage: '`'+prefix+'servers`',
    permission: '`None`',
    execute(msg) {
        async function APIServers(){
            let account = await exarotonClient.getAccount();
            let servers = await exarotonClient.getServers();
            if(servers.length == 0) {
                const noServerFound = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription(`The exaroton account **${account.name}** has no servers.`)
                    .setColor(errorColor)
                msg.channel.send(noServerFound)
                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                return
            } else{
                try{
                    for(let server of servers) {
                        msg.channel.send('Sever address: `' + server.address + '`| Server ID: `' + server.id + '`')
                    }
                } catch (e) {
                    console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                    console.error('An error occurred while using "servers" command: ' + e.message);
                    const errorEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('An error occurred while running that command: `' + e.message + '`')
                        .setColor(errorColor)
                    msg.channel.send(errorEmbed)    
                }
            }
        }
        APIServers();
    }
}