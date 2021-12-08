const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'motd',
    description: 'Get or change your server MOTD.',
    usage: '`'+prefix+'motd {server name|ID|address} [set <new MOTD>]`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APImotd(){
            try{
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Your message does not include the **{server}** parameter. \n*Use ' + '`'+prefix+'help motd`' + ' for more information.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                if(args[1] === undefined) {
                    let motd = await server.getMOTD();
                    let motdDecoded = motd;
                    motdDecoded = motdDecoded.replace(/\\u[\da-f]{4}/gi, c => String.fromCodePoint(parseInt(c.substr(2), 16)));
                    motdDecoded = motdDecoded.replace(/\n/g, '').replace('\\n', '\n');
                    motdDecoded = motdDecoded.replace(/§[\da-gk-or]/g, '');
                    const motdEmbed = new Discord.MessageEmbed()
                        .setTitle(`MOTD for server ${server.name}`)
                        .setDescription(`\`With formatting:\` ${motd} \n\`Without formatting:\` ${motdDecoded}`)
                        .setColor(config.embedColor)
                        .setTimestamp()
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[motdEmbed]})
                    return
                } else {
                    if(args[1] === 'set') {
                        if(args[2] !== undefined) {
                            let newMOTD = args.slice(2).join(' ')
                            await server.setMOTD(newMOTD)
                            const updatedMOTD = new Discord.MessageEmbed()
                                .setDescription(`I have successfully changed the MOTD for the server **${server.name}** to: \n${newMOTD}`)
                                .setColor(config.embedColor)
                                .setTimestamp()
                                .setFooter(msg.author.tag, msg.author.avatarURL())
                            await msg.channel.send({embeds: [updatedMOTD]})
                            return
                        } else {
                            const missingDescription = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Your message does not include the description for your MOTD. \n*Use ' + '`'+prefix+'help motd`' + ' for more information.*')
                                .setColor(config.errorColor)
                            await msg.channel.send({embeds:[missingDescription]})
                            return
                        }
                    } else {
                        const notValidOption = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('If you want to change the server MOTD use the argument `set`. \n*Use ' + '`'+prefix+'help motd`' + ' for more information.*')
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[notValidOption]})
                        return
                    }
                }
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "motd": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'getMOTD')"){
                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`Server "${args[0]}" not found.`)
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[serverNotFoundEmbed]})
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
        APImotd();
    }
}