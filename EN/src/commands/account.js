const Discord = require('discord.js');
const config = require("../config.json");
const prefix = config.prefix;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'account',
    description: 'Get information about your exaroton account.',
    usage: '`'+prefix+'account`',
    permission: '`None`',
    execute(bot, msg, args){
        async function APIaccount() {
            try{
                let account = await exarotonClient.getAccount();
                if (account.verified == true) {
                    embedDescription = 'verified'
                } else if (account.verified == false) {
                    embedDescription = 'not verified'
                }
                const accountEmbed = new Discord.MessageEmbed()
                    .setDescription(`The exaroton account **${account.name}** is ${embedDescription} and currently has **${account.credits}** credits.`)
                    .setColor(config.embedColor)
                    .setTimestamp()
                    .setFooter(msg.author.tag, msg.author.avatarURL())
                await msg.channel.send({embeds:[accountEmbed]})
            } catch(e){
                console.log(msg.content + ' | User: ' + msg.author.tag)
                console.error(`Error while executing command "account": ${e.message}`)
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('An error occurred while running that command: `' + e.message + '`')
                    .setColor(config.errorColor)
                await msg.channel.send({embeds:[errorEmbed]})
                return
            }
        }
        APIaccount();    
    }
}