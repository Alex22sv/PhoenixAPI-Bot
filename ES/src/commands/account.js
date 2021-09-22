const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'account',
    description: 'Obtén información acerca de tu cuenta de exaroton.',
    usage: '`'+prefix+'account`',
    permission: '`Ninguno`',
    execute(bot, msg, args){
        async function APIaccount() {
            try{
                let account = await exarotonClient.getAccount();
                if (account.verified == true) {
                    embedDescription = 'está verificada'
                } else if (account.verified == false) {
                    embedDescription = 'no está verificada'
                }
                const accountEmbed = new Discord.MessageEmbed()
                    .setDescription(`La cuenta de exaroton **${account.name}** ${embedDescription} y tiene actualmente **${account.credits}** créditos.`)
                    .setColor(config.embedColor)
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                await msg.channel.send({embeds:[accountEmbed]})
            } catch(e){
                console.log(msg.content + ' | Usuario: ' + msg.author.tag)
                console.error(`Error al usar el comando "account": ${e.message}`)
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                    .setColor(config.errorColor)
                await msg.channel.send({embeds:[errorEmbed]})
                return
            }
        }
        APIaccount();    
    }
}