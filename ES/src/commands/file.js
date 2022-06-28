const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'file',
    description: 'Obtén el contenido de los archivos de texto de tu servidor.',
    usage: '`'+prefix+'file {nombre|ID|dirección del servidor} {nombre del archivo}`',
    permission: '`ADMINISTRADOR`',
    execute(bot, msg, args){
        async function APIfile(){
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
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help file`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(!args[1]){
                    const missingFileEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{file name}**. \n*Usa ' + '`'+prefix+'help file`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingFileEmbed]})
                    return
                }
                
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let fileName = args[1];
                let file = await server.getFile(fileName);
                await file.getInfo()
                fileJson = JSON.parse(JSON.stringify(file));
                // console.log(fileJson);
                //Json example: {path: 'ops.json', name: 'ops.json', isTextFile: true, isConfigFile: false, isDirectory: false, isLog: false, isReadable: true, isWritable: true, size: 2, children: null}
                if(fileJson.isTextFile && fileJson.isReadable){
                    let content = await file.getContent();
                    const fileEmbed = new Discord.MessageEmbed()
                        .setTitle(`Contenido del archivo ${fileName}`)
                        .setDescription(content)
                        .setColor(config.embedColor)
                    await msg.channel.send({embeds:[fileEmbed]})
                    return
                }
                if(!fileJson.isTextFile) {
                    const notTextFileEmbed = new Discord.MessageEmbed()
                        .setTitle("Error!")
                        .setDescription(`El archivo **${fileName}** no es un archivo de texto.`)
                        .setColor(config.errorColor)
                    return await msg.channel.send({embeds:[notTextFileEmbed]})
                }
                if(!fileJson.isReadable) {
                    const notReadableEmbed = new Discord.MessageEmbed()
                        .setTitle("Error!")
                        .setDescription(`El archivo **${fileName}** no puede ser leído.`)
                        .setColor(config.errorColor)
                    return await msg.channel.send({embeds:[notReadableEmbed]})
                }
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "file": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'getFile')"){
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                }
                if(e.message.includes('404')) {
                    const fileNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`El archivo "${args[1]}" no ha sido encontrado.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[fileNotFoundEmbed]})
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
        APIfile();
    }
}