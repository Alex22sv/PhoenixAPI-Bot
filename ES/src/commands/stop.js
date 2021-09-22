const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'stop',
    description: 'Detén un servidor de Minecraft',
    usage: '`'+prefix+'stop {nombre|ID|dirección del servidor}`',
    permission: '`ADMINISTRADOR`',
    execute(bot, msg, args){
        async function APIstop(){
            try{
                if(!msg.member.permissions.has("ADMINISTRATOR")){
                    const MissingPermissionsEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Necesitas el permiso `Administrador` para ejecutar ese comando.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[MissingPermissionsEmbed]})
                    return
                }
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help stop`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                await server.executeCommand('say [exaroton API] Este servidor será detenido en unos segundos.');
                let url = await server.shareLogs();
                await server.stop();
                const serverStoppingEmbed = new Discord.MessageEmbed()
                .setDescription(`${config.loadingEmoji} Deteniendo el servidor **${server.name}**\nRegistro del servidor: `+url)
                    .setColor(config.embedColor)
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                await msg.channel.send({embeds:[serverStoppingEmbed]}) 
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "stop": ${e.message}`)
                if(e.message == 'Server is not online') {
                    const serverNotOnlineEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Esto es únicamente posible cuando tu servidor está en línea.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotOnlineEmbed]})
                    return
                }
                if(e.message === "Cannot read properties of undefined (reading 'executeCommand')"){
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
        APIstop();
    }
}