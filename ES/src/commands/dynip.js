const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'dynip',
    description: "Obtén la DynIP (IP dinámica) del servidor.",
    usage: '`'+prefix+'dynip {nombre|ID|dirección del servidor}`',
    permission: '`Ninguno`',
    execute(bot, msg, args){
        async function APIdynip(){
            try{
                if(args.length === 0){
                    const notSeverMentioned = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription('Tu mensaje no incluye el parámetro **{servidor}**. \n*Usa ' + '`'+prefix+'help dynip`' + ' para más información.*')
                        .setColor(config.errorColor)
                    await msg.channel.send({embeds:[notSeverMentioned]})
                    return
                }
                let name = args[0];
                let serverLists = await exarotonClient.getServers();
                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                await server.get();
                if(server.host == null){
                    const errorDynipEmbed = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription("No puedo obtener la IP dinámica de ese servidor porque está apagado.")
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[errorDynipEmbed]})
                        return
                }
                const DynipEmbed = new Discord.MessageEmbed()
                    .setDescription('IP dinámica del servidor **' + server.name + '**: `' + server.host + ':' +server.port + '`')
                    .setColor(config.embedColor)
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                await msg.channel.send({embeds:[DynipEmbed]})
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error al usar el comando "dynip": ${e.message}`)
                if(e.message === "Cannot read properties of undefined (reading 'get')"){
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
        APIdynip();
    }
}