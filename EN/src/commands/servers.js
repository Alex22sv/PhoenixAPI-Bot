const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'servers',
    description: 'List all servers from your exaroton account.',
    usage: '`'+prefix+'servers`',
    permission: '`None`',
    execute(bot, msg, args) {
        async function APIServers(){ 
            try{
                let account = await exarotonClient.getAccount();
                let servers = await exarotonClient.getServers();
                if(servers.length == 0) {
                    const noServerFound = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`The exaroton account **${account.name}** has no servers.`)
                        .setColor(errorColor)
                        await msg.channel.send({embeds:[noServerFound]})
                    return
                } else{
                        for(let server of servers){
                            await msg.channel.send('Sever address: `' + server.address + '`| Server ID: `' + server.id + '`')}
                }
            } catch (e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "servers": ${e.message}`)
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('An error occurred while running that command: `' + e.message + '`')
                    .setColor(config.errorColor)
                await msg.channel.send({embeds:[errorEmbed]})
                return
            }
        }
        APIServers();
    }
}