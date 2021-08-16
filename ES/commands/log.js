const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'log',
    description: 'Sube registros de servidores a https://mclo.gs/.',
    usage: '`'+prefix+'log {nombre|ID|dirección del servidor}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(msg.member.hasPermission('ADMINISTRATOR')){
            if(args[0] == undefined){
                const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help log` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
            }
            if(args[0] != undefined){
                async function APIlog() {
                    try{
                        let name = args[0];
                        let serverLists = await exarotonClient.getServers();
                        let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                        let logs = await server.shareLogs();
                        const logsEmbed = new Discord.MessageEmbed()
                            .setDescription(`Registro del servidor **${server.name}**: ${logs}`)
                            .setColor(embedColor)
                        msg.channel.send(logsEmbed)
                    } catch (e) {
                        console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                        console.error('Error al usar el comando "log": '+ e.message);
                        if(e.message == "Required POST argument 'content' is empty.") {
                            const emptyLogEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('El registro de ese servidor está vacío.')
                                .setColor(errorColor)
                            msg.channel.send(emptyLogEmbed)
                        }
                        else if(e.message == "Cannot read property 'shareLogs' of undefined") {
                            const serverNotFoundEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                                .setColor(errorColor)
                            msg.channel.send(serverNotFoundEmbed)
                        } else {
                            const errorEmbed = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                                .setColor(errorColor)
                            msg.channel.send(errorEmbed)
                        }
                    }
                }
                APIlog();
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