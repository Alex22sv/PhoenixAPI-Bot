const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'ram',
    description: 'Obtén o cambia el RAM del servidor.', 
    usage: 'Obtener RAM: `'+prefix+'ram {nombre|ID|dirección del servidor} obtener` \nCambiar RAM: `'+prefix+'ram {nombre|ID|dirección del servidor} fijar {ram}`',
    permission: '`ADMINISTRADOR`',
    execute(bot, msg, args){
        async function APIram(){
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
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help ram`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingParameterEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{get/set}**. \n*Usa ' + '`'+prefix+'help ram`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingParameterEmbed]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let serverRAM = await server.getRAM();
                if(args[1].toLowerCase() == "obtener"){
                    const serverRAMembed = new Discord.MessageEmbed()
                        .setDescription(`RAM del servidor **${server.name}**: ${serverRAM}GB`)
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[serverRAMembed]})
                    return
                }
                if(args[1].toLowerCase() == "fijar"){
                    if(args.length === 2){
                        const missingRAMparameter = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Tu mensaje no incluye el parámetro **{ram}**. \n*Usa ' + '`'+prefix+'help ram`' + ' para más información.*')
                            .setColor(config.errorColor)
                        await msg.channel.send({embeds:[missingRAMparameter]})
                        return
                    }
                    await server.setRAM(args[2]);    
                    const changedRAMembed = new Discord.MessageEmbed()
                        .setDescription(`La RAM del servidor **${server.name}** ha cambiado de **${serverRAM}GB** a **${args[2]}GB**.`)
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[changedRAMembed]})
                    return
                }
                const notValidOption = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('"'+args[1]+'" no es una opción válida. \n*Usa ' + '`'+prefix+'help ram`' + ' para más información.*')
                    .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notValidOption]})
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "ram": ${e.message}`)
                if(e.message == "Cannot read properties of undefined (reading 'getRAM')") {
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                }
                if(e.message == "Ram must be in range 2 <= ram <= 16"){
                    const notValidParameter = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('La RAM debe estar en un rango de 2-16GB.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notValidParameter]})
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
        APIram();
    }
}
