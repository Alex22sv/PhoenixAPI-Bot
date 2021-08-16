const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'stop',
    description: 'Detén un servidor de Minecraft.',
    usage: '`'+prefix+'stop {nombre|ID|dirección del servidor}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(args[0] == undefined){
                const notSeverMentioned = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help stop` para más información.')
                    .setColor(errorColor)
                msg.channel.send(notSeverMentioned)
                return
            } else{
                async function APIstop() {
                    try {
                        let name = args[0];
                        let serverLists = await exarotonClient.getServers();
                        let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                        await server.executeCommand('say [exaroton API] Este servidor será apagado en unos segundos.');
                        let url = await server.shareLogs();
                        await server.stop();
                        const serverStoppingEmbed = new Discord.MessageEmbed()
                            .setDescription(`Deteniendo servidor **${server.name}** \nRegistro del servidor: `+url)
                            .setColor(embedColor)
                            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                        msg.channel.send(serverStoppingEmbed)
                        console.log(msg.author.username+'#'+msg.author.discriminator+' just stopped server '+server.name)
                    } catch (e) {
                        console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                        console.error('Error al usar el comando "stop": ' + e.message);
                        if(e.message == 'Server is not online') {
                            const serverNotOnlineEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Esto es únicamente posible cuando el servidor está en línea.')
                                .setColor(errorColor)
                            msg.channel.send(serverNotOnlineEmbed)
                        }
                        else if(e.message == "Cannot read property 'executeCommand' of undefined") {
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
                APIstop();
            }
        }
        if(!msg.member.hasPermission('ADMINISTRATOR'))  {
            const MissingPermissionsEmbed = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Necesitas el permiso `Administrador` para ejecutar ese comando.')
                .setColor(errorColor)
            msg.channel.send(MissingPermissionsEmbed)
        }
    }
}