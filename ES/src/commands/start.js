const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'start',
    description: 'Inicia un servidor de Minecraft.',
    usage: '`'+prefix+'start {nombre|ID|dirección del servidor}`',
    permission: '`ADMINISTRADOR`',
    execute(bot, msg, args){
        async function APIstart(){
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
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help start`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                try{
                    let url = await server.shareLogs();
                    await server.start();
                    const serverStartingEmbed = new Discord.MessageEmbed()
                        .setDescription(`${config.loadingEmoji} Iniciando el servidor **${server.name}**\nRegistro del servidor: `+url)
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[serverStartingEmbed]}) 
                } catch(e){
                    if(e.message == "Log file is empty or does not exist"){
                        let url = "`Registro vacío o no existe.`"
                        await server.start();
                        const serverStartingEmbed = new Discord.MessageEmbed()
                        .setDescription(`${config.loadingEmoji} Iniciando el servidor **${server.name}**\nRegistro del servidor: `+url)
                            .setColor(config.embedColor)
                            .setFooter(msg.author.tag, msg.author.avatarURL())
                        await msg.channel.send({embeds:[serverStartingEmbed]}) 
                    }
                }
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "start": ${e.message}`)
                if(e.message == 'Server is not offline') {
                    const serverNotOfflineEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Esto es únicamente posible cuando tu servidor está fuera de línea.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotOfflineEmbed]})
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
        APIstart();
    }
}