const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'status',
    description: 'Crea un incrustado para mostrar el estado del servidor.',
    usage: '`'+prefix+'status {nombre|ID|dirección del servidor}`',
    permission: '`Ninguno`',
    execute(bot, msg, args){
        async function APIStatus(){
            try{
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help status`' + ' para más información.*')
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
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "status": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'get')"){
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                } else{
                    const errorEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[errorEmbed]})
                    return
                }
            }
        }
        APIStatus();
        function generateEmbed(server) {  
            if (server.hasStatus(server.STATUS.ONLINE)) {
                currentStatus = 'En línea'
                statusColor = '#19ba19'
            } else if (server.hasStatus(server.STATUS.PREPARING)) {
                currentStatus = 'Preparando...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.STARTING)) {
                currentStatus = 'Iniciando...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.LOADING)) {
                currentStatus = 'Cargando...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.RESTARTING)) {
                currentStatus = 'Reiniciando...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.PENDING)) {
                currentStatus = 'Pendiente'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.CRASHED)) {
                currentStatus = 'Crasheado'
                statusColor = '#f91c1c'
            } else if (server.hasStatus(server.STATUS.STOPPING)){
                currentStatus = 'Deteniendo...'
                statusColor = '#678188'
            } else if (server.hasStatus(server.STATUS.SAVING)) {
                currentStatus = 'Guardando...'
                statusColor = '#678188'
            } else if(server.hasStatus(server.STATUS.OFFLINE)) {
                currentStatus = 'Fuera de línea'
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
                    {name:'Estado actual', value:currentStatus, inline:true},
                    {name:'Jugadores', value:`${server.players.count}/${server.players.max}`, inline:true},
                    {name:'Software', value:`${server.software.name} ${server.software.version}`, inline:true}
                )
                .setFooter(`${msg.author.tag} • ${server.id}`, msg.author.avatarURL())
        }
    }
}

