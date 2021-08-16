const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'status',
    description: 'Crea un incrustado en Discord para obtener el estado del servidor.',
    usage: '`'+prefix+'status {nombre|ID|dirección del servidor}`',
    permission: '`Ninguno`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help status` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }
        if(args[0] != undefined){
            async function APIStatus(){
                try{
                    let name = args[0];
                    let serverLists = await exarotonClient.getServers();
                    let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                    await server.get();
                    const statusEmbed = generateEmbed(server)
                    let embedMsg = await msg.channel.send(statusEmbed)
                    msg.delete()
                    server.subscribe()
                    server.on('status', function(server) { embedMsg.edit(generateEmbed(server)); });
                }
                catch (e) {
                    console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                    console.error('Error al usar el comando "status": ' + e.message)
                    if(e.message == "Cannot read property 'get' of undefined"){
                        const serverNotFoundEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                            .setColor(errorColor)
                        msg.channel.send(serverNotFoundEmbed)
                    } else{ 
                        const errorEmbed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                            .setColor(errorColor)
                        msg.channel.send(errorEmbed)
                    }
                }
            }
            APIStatus();
        }
        function generateEmbed(server) {  
            if (server.hasStatus(server.STATUS.ONLINE)) {
                currentStatus = 'En línea'
                colorEmbed = '#19ba19'
            } else if (server.hasStatus(server.STATUS.PREPARING)) {
                currentStatus = 'Preparando...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.STARTING)) {
                currentStatus = 'Iniciando...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.LOADING)) {
                currentStatus = 'Cargando...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.RESTARTING)) {
                currentStatus = 'Reiniciando...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.PENDING)) {
                currentStatus = 'Pendiente'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.CRASHED)) {
                currentStatus = 'Crasheado'
                colorEmbed = '#f91c1c'
            } else if (server.hasStatus(server.STATUS.STOPPING)){
                currentStatus = 'Deteniendo...'
                colorEmbed = '#678188'
            } else if (server.hasStatus(server.STATUS.SAVING)) {
                currentStatus = 'Guardando...'
                colorEmbed = '#678188'
            } else if(server.hasStatus(server.STATUS.OFFLINE)) {
                currentStatus = 'Apagado'
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
                    {name:'Estado actual', value:currentStatus, inline:true},
                    {name:'Jugadores', value:`${server.players.count}/${server.players.max}`, inline:true},
                    {name:'Software', value:`${server.software.name} ${server.software.version}`, inline:true}
                )
                .setFooter(msg.author.username+'#'+msg.author.discriminator+' • '+server.id, msg.member.user.displayAvatarURL())
        }
    }
}

