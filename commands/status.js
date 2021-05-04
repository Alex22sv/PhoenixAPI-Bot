const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'status',
    description: 'Create an embed to show the status for a server.',
    usage: '`'+prefix+'status {server name}`',
    permission: '`None`',
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
            async function APIStatus(){
                try{
                    let name = args[0];
                    let serverLists = await exarotonClient.getServers();
                    let server = serverLists.find(server => server.name === name);
                    await server.get();
                    const statusEmbed = generateEmbed(server)
                    let embedMsg = await msg.channel.send(statusEmbed)
                    msg.delete()
                    server.subscribe()
                    server.on('status', function(server) { embedMsg.edit(generateEmbed(server)); });
                }
                catch (e) {
                    console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                    console.error('Error while using "status" command: ' + e.message)
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
            APIStatus();
        }
        function generateEmbed(server) {  
            if (server.hasStatus(server.STATUS.ONLINE)) {
                currentStatus = 'Online'
                colorEmbed = '#19ba19'
            } else if (server.hasStatus(server.STATUS.PREPARING)) {
                currentStatus = 'Preparing...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.STARTING)) {
                currentStatus = 'Starting...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.LOADING)) {
                currentStatus = 'Loading...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.RESTARTING)) {
                currentStatus = 'Restarting...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.PENDING)) {
                currentStatus = 'Pending'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.CRASHED)) {
                currentStatus = 'Crashed'
                colorEmbed = '#f91c1c'
            } else if (server.hasStatus(server.STATUS.STOPPING)){
                currentStatus = 'Stopping...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.SAVING)) {
                currentStatus = 'Saving...'
                colorEmbed = '#678188'
            } else if(server.hasStatus(server.STATUS.OFFLINE)) {
                currentStatus = 'Offline'
                colorEmbed = '#f91c1c'
            }
            let motd = server.motd;
            motd = motd.replace(/\\u[\da-f]{4}/gi, c => String.fromCodePoint(parseInt(c.substr(2), 16)));
            motd = motd.replace(/\n/g, '').replace('\\n', '\n');
            motd = motd.replace(/§[\da-gk-or]/g, '');
            return new Discord.MessageEmbed()
                .setTitle(server.address)
                .setDescription(motd)
                .setColor(colorEmbed)
                .addFields(
                    {name:'Current Status', value:currentStatus, inline:true},
                    {name:'Players', value:`${server.players.count}/${server.players.max}`, inline:true},
                    {name:'Software', value:`${server.software.name} ${server.software.version}`, inline:true}
                )
                .setFooter(msg.author.username+'#'+msg.author.discriminator+' • '+server.id, msg.member.user.displayAvatarURL())
        }
    }
}

