const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'account',
    description: 'Get information about your exaroton account.',
    usage: '`'+prefix+'account`',
    permission: '`None`',
    execute(msg){
        async function APIaccount() {
            try{
                let account = await exarotonClient.getAccount();
                if (account.verified == true) {
                    embedDescription = 'verified'
                } else if (account.verified == false) {
                    embedDescription = 'not verified'
                }
                const accountEmbed = new Discord.MessageEmbed()
                    .setDescription(`The exaroton account ${account.name} is ${embedDescription} and currently has ${account.credits} credits.`)
                    .setColor(embedColor)
                    .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                msg.channel.send(accountEmbed)
            }
            catch (e){
                console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator)
                console.error('Error while using "account" command: ' + e.message)
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('An error occurred while running that command: `' + e.message + '`')
                    .setColor(errorColor)
                msg.channel.send(errorEmbed)
            }
        }
        APIaccount();    
    }
}