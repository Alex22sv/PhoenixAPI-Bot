const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'start',
    description: 'Inicia un servidor de Minecraft.',
    usage: '`'+prefix+'start {nombre|ID|dirección del servidor}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(args[0] == undefined){
                const notSeverMentioned = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help start` para más información.')
                    .setColor(errorColor)
                msg.channel.send(notSeverMentioned)
                return
            } else{
                async function APIstart() {
                    try {
                        let name = args[0];
                        let serverLists = await exarotonClient.getServers();
                        let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                        await server.start();
                        const serverStartingEmbed = new Discord.MessageEmbed()
                            .setDescription(`Starting server **${server.name}**`)
                            .setColor(embedColor)
                            .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                        msg.channel.send(serverStartingEmbed)
                        console.log(msg.author.username+'#'+msg.author.discriminator+' just started server '+server.name)
                    } catch (e) {
                        console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                        console.error('Error al usar el comando "start": ' + e.message);
                        if(e.message == 'Server is not offline') {
                            const serverNotOnlineEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription("Esto es únicamente posible cuando el servidor está apagado.")
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
                APIstart();
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