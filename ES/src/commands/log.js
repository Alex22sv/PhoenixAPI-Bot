const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'log',
    description: 'Sube el registro del servidor a https://mclo.gs/.',
    usage: '`'+prefix+'log {nombre|ID|dirección del servidor}`',
    permission: '`Ninguno`',
    execute(bot, msg, args){
        async function APIlog(){
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
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help log`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let logs = await server.shareLogs();
                const logsEmbed = new Discord.MessageEmbed()
                    .setDescription(`Registro del servidor **${server.name}**: ${logs}`)
                    .setColor(config.embedColor)
                await msg.channel.send({embeds:[logsEmbed]})
                return
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "log": ${e.message}`)
                if(e.message == "Log file is empty or does not exist"){
                    const emptyLogEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('El registro de ese servidor está vacío o no existe.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[emptyLogEmbed]})
                    return
                }
                if(e.message === "Cannot read properties of undefined (reading 'shareLogs')"){
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
        APIlog();
    }
}