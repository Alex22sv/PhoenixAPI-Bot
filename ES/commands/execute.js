const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'execute',
    description: 'Ejecuta comandos de Minecraft a través de la API.',
    usage: '`'+prefix+'execute {nombre|ID|dirección del servidor} {comando}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            if(args[0] == undefined) {
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help execute` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
            }
    
            if(args[0] != undefined) {
                if(args[1] == undefined){
                    const notCommandEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye un comando de Minecraft. \n Usa `'+prefix+'help execute` para más información.')
                        .setColor(errorColor)
                    msg.channel.send(notCommandEmbed)
                    return
                } else {
                    async function APIExecute() {
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            await server.executeCommand('/say Ejecutando comandos a través de la API...');
                            await server.executeCommand(args.slice(1).join(' '))
                            await server.executeCommand('/save-all');
                            const executeEmbed = new Discord.MessageEmbed()
                                .setDescription('Comandos ejecutados correctamente.')
                                .setColor(embedColor)
                            msg.channel.send(executeEmbed)
                        } catch (e) {
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('Error al usar el comando "execute": ' + e.message)
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
                    APIExecute();      
                }

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