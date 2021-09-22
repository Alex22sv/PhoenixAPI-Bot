const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'ram',
    description: 'Get/Change the server RAM.', 
    usage: 'Get RAM: `'+prefix+'ram {server name|ID|address} get` \nChange RAM: `'+prefix+'ram {server name|ID|address} set {ram}`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APIram(){
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
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help ram`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                if(args.length === 1){
                    const missingParameterEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{get/set}** parameter. \n*Use ' + '`'+prefix+'help ram`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[missingParameterEmbed]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                let serverRAM = await server.getRAM();
                if(args[1].toLowerCase() == "get"){
                    const serverRAMembed = new Discord.MessageEmbed()
                        .setDescription(`RAM for server **${server.name}**: ${serverRAM}GB`)
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[serverRAMembed]})
                    return
                }
                if(args[1].toLowerCase() == "set"){
                    if(args.length === 2){
                        const missingRAMparameter = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Your message does not include the **{ram}** parameter. \n*Use ' + '`'+prefix+'help ram`' + ' for more information.*')
                            .setColor(config.errorColor)
                        await msg.channel.send({embeds:[missingRAMparameter]})
                        return
                    }
                    await server.setRAM(args[2]);    
                    const changedRAMembed = new Discord.MessageEmbed()
                        .setDescription(`RAM for server **${server.name}** has changed from **${serverRAM}GB** to **${args[2]}GB**.`)
                        .setColor(config.embedColor)
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[changedRAMembed]})
                    return
                }
                const notValidOption = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('"'+args[1]+'" is not a valid option about RAM. \n*Use ' + '`'+prefix+'help ram`' + ' for more information.*')
                    .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notValidOption]})
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "ram": ${e.message}`)
                if(e.message == "Cannot read properties of undefined (reading 'getRAM')") {
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`Server "${args[0]}" not found.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
                    return
                }
                if(e.message == "Ram must be in range 2 <= ram <= 16"){
                    const notValidParameter = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('RAM must be in range of 2-16.')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notValidParameter]})
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
        APIram();
    }
}
