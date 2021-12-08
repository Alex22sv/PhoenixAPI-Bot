const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'motd',
    description: 'Obtén o cambia el MOTD del servidor.',
    usage: '`'+prefix+'motd {nombre|ID|dirección del servidor} [establecer <nuevo MOTD>]`',
    permission: '`ADMINISTRATOR`',
    execute(bot, msg, args){
        async function APImotd(){
            try{
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help motd`' + ' para más información.*')
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
                        .setTitle(`MOTD del servidor ${server.name}`)
                        .setDescription(`\`Con formato:\` ${motd} \n\`Sin formato:\` ${motdDecoded}`)
                        .setColor(config.embedColor)
                        .setTimestamp()
                        .setFooter(msg.author.tag, msg.author.avatarURL())
                    await msg.channel.send({embeds:[motdEmbed]})
                    return
                } else {
                    if(args[1] === 'establecer') {
                        if(args[2] !== undefined) {
                            let newMOTD = args.slice(2).join(' ')
                            await server.setMOTD(newMOTD)
                            const updatedMOTD = new Discord.MessageEmbed()
                                .setDescription(`He cambiado el MOTD del servidor con éxito **${server.name}** a: \n${newMOTD}`)
                                .setColor(config.embedColor)
                                .setTimestamp()
                                .setFooter(msg.author.tag, msg.author.avatarURL())
                            await msg.channel.send({embeds: [updatedMOTD]})
                            return
                        } else {
                            const missingDescription = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Tu mensaje no incluye la descripción para tu MOTD. \n*Usa ' + '`'+prefix+'help motd`' + ' para más información.**')
                                .setColor(config.errorColor)
                            await msg.channel.send({embeds:[missingDescription]})
                            return
                        }
                    } else {
                        const notValidOption = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Si quieres cambiar el MOTD del servidor usa el argumento `establecer`. \n*Usa ' + '`'+prefix+'help motd`' + ' para más información.*')
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[notValidOption]})
                        return
                    }
                }
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "motd": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'getMOTD')"){
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
        APImotd();
    }
}