const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'servers',
    description: 'Lista todos los servidores de tu cuenta de exaroton.',
    usage: '`'+prefix+'servers`',
    permission: '`Ninguno`',
    execute(bot, msg, args) {
        async function APIServers(){ 
            try{
                let account = await exarotonClient.getAccount();
                let servers = await exarotonClient.getServers();
                if(servers.length == 0) {
                    const noServerFound = new Discord.MessageEmbed()
                        .setTitle('Error!')
                        .setDescription(`La cuenta de exaroton **${account.name}** no tiene servidores.`)
                        .setColor(config.errorColor)
                        await msg.channel.send({embeds:[noServerFound]})
                    return
                } else{
                        for(let server of servers){
                            await msg.channel.send('Dirección del servidor: `' + server.address + '`| ID del servidor: `' + server.id + '`')}
                }
            } catch (e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "servers": ${e.message}`)
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                    .setColor(config.errorColor)
                await msg.channel.send({embeds:[errorEmbed]})
                return
            }
        }
        APIServers();
    }
}