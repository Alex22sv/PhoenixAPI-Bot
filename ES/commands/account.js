const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'account',
    description: 'Obtén información acerca de tu cuenta de exaroton.',
    usage: '`'+prefix+'account`',
    permission: '`Ninguno`',
    execute(msg){
        async function APIaccount() {
            try{
                let account = await exarotonClient.getAccount();
                if (account.verified == true) {
                    embedDescription = 'está verificada'
                } else if (account.verified == false) {
                    embedDescription = 'no está verificada'
                }
                const accountEmbed = new Discord.MessageEmbed()
                    .setDescription(`La cuenta de exaroton ${account.name} ${embedDescription} y tiene actualmente ${account.credits} créditos.`)
                    .setColor(embedColor)
                    .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                msg.channel.send(accountEmbed)
            }
            catch (e){
                console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                console.error('Error al usar el comando "account": ' + e.message)
                const errorEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                    .setColor(errorColor)
                msg.channel.send(errorEmbed)
            }
        }
        APIaccount();    
    }
}