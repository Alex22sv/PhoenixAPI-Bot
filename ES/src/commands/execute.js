const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'execute',
    description: 'Ejecuta comandos de Minecraft a través de la API.',
    usage: '`'+prefix+'execute {nombre|ID|dirección del servidor} {comando de Minecraft}`',
    permission: '`ADMINISTRADOR`',
    execute(bot, msg, args){
        async function APIexecute(){
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
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help execute`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingPlayerEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{comando de Minecraft}**. \n*Usa ' + '`'+prefix+'help execute`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingPlayerEmbed]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let MinecraftCommand = args.slice(1).join(' ')
                await server.executeCommand('/say Ejecutando comando a través de la API...');
                await server.executeCommand(MinecraftCommand)
                await server.executeCommand('/save-all');
                const executeEmbed = new Discord.MessageEmbed()
                    .setDescription(`Comando \`${MinecraftCommand}\` ejecutado correctamente.`)
                    .setColor(config.embedColor)
                    await msg.channel.send({embeds:[executeEmbed]})
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "execute": ${e.message}`)
                if(e.message == 'Server is not online') {
                    const serverNotOnlineEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Esto es únicamente posible cuando el servidor está en línea.')
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
        APIexecute();
    }
}