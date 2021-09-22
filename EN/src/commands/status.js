const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'status',
    description: 'Create an embed to show the status for a server.',
    usage: '`'+prefix+'status {server name|ID|address}`',
    permission: '`None`',
    execute(bot, msg, args){
        async function APIStatus(){
            try{
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help stop`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                await server.get();
                const statusEmbed = generateEmbed(server)
                let embedMsg = await msg.channel.send({embeds:[statusEmbed]})
                server.subscribe()
                server.on('status', function(server) { embedMsg.edit({embeds:[generateEmbed(server)]}); });
                
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "status": ${e.message}`)
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
        APIStatus();
        function generateEmbed(server) {  
            if (server.hasStatus(server.STATUS.ONLINE)) {
                currentStatus = 'Online'
                statusColor = '#19ba19'
            } else if (server.hasStatus(server.STATUS.PREPARING)) {
                currentStatus = 'Preparing...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.STARTING)) {
                currentStatus = 'Starting...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.LOADING)) {
                currentStatus = 'Loading...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.RESTARTING)) {
                currentStatus = 'Restarting...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.PENDING)) {
                currentStatus = 'Pending'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.CRASHED)) {
                currentStatus = 'Crashed'
                statusColor = '#f91c1c'
            } else if (server.hasStatus(server.STATUS.STOPPING)){
                currentStatus = 'Stopping...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.SAVING)) {
                currentStatus = 'Saving...'
                statusColor = '#678188'
            } else if(server.hasStatus(server.STATUS.OFFLINE)) {
                currentStatus = 'Offline'
                statusColor = '#f91c1c'
            }
            let motd = server.motd;
            motd = motd.replace(/\\u[\da-f]{4}/gi, c => String.fromCodePoint(parseInt(c.substr(2), 16)));
            motd = motd.replace(/\n/g, '').replace('\\n', '\n');
            motd = motd.replace(/§[\da-gk-or]/g, '');
            return new Discord.MessageEmbed()
                .setTitle(server.address)
                .setDescription(motd)
                .setColor(statusColor)
                .addFields(
                    {name:'Current Status', value:currentStatus, inline:true},
                    {name:'Players', value:`${server.players.count}/${server.players.max}`, inline:true},
                    {name:'Software', value:`${server.software.name} ${server.software.version}`, inline:true}
                )
                .setFooter(`${msg.author.tag} • ${server.id}`, msg.author.avatarURL())
        }
    }
}

