const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'file',
    description: 'Get the content of text files on your server.',
    usage: '`'+prefix+'file {server name|ID|address} {file name}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIfile(){
            try{
                if(!msg.member.permissions.has("ADMINISTRATOR")){
                    const MissingPermissionsEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('You need the permission `Administrator` to use that command.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[MissingPermissionsEmbed]})
                    return
                }
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help file`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(!args[1]){
                    const missingFileEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{file name}** parameter. \n*Use ' + '`'+prefix+'help file`' + ' for more information.*')
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
                        .setTitle(`Content of file ${fileName}`)
                        .setDescription(content)
                        .setColor(config.embedColor)
                    await msg.channel.send({embeds:[fileEmbed]})
                    return
                }
                if(!fileJson.isTextFile) {
                    const notTextFileEmbed = new Discord.MessageEmbed()
                        .setTitle("Error!")
                        .setDescription(`The file **${fileName}** is not a text file.`)
                        .setColor(config.errorColor)
                    return await msg.channel.send({embeds:[notTextFileEmbed]})
                }
                if(!fileJson.isReadable) {
                    const notReadableEmbed = new Discord.MessageEmbed()
                        .setTitle("Error!")
                        .setDescription(`The file **${fileName}** is not readable.`)
                        .setColor(config.errorColor)
                    return await msg.channel.send({embeds:[notReadableEmbed]})
                }
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "file": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'getFile')"){
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`Server "${args[0]}" not found.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                }
                if(e.message.includes('404')) {
                    const fileNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`File "${args[1]}" not found.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[fileNotFoundEmbed]})
                    return
                } else{
                    const errorEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('An error occurred while running that command: `' + e.message + '`')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[errorEmbed]})
                    return
                }
            }
        }
        APIfile();
    }
}