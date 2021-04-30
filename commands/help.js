const Discord = require('discord.js');
const config = require('../config.json');
const account = require('./account');
const ban = require('./ban');
const deop = require('./deop')
const dynip = require('./dynip');
const execute = require('./execute');
const info = require('./info');
const list = require('./list');
const log = require('./log');
const op = require('./op');
const pardon = require('./pardon');
const ram = require('./ram');
const restart = require('./restart');
const servers = require('./servers');
const start = require('./start');
const status = require('./status');
const stop = require('./stop');
const whitelist = require('./whitelist')
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

module.exports = {
    name: 'help', 
    description: 'Display the list of commands or get information about a single command.',
    usage: '`'+prefix+'help {command}`',
    permission: '`None`',
    execute(msg, args){
        if(args[0] == undefined) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('PhoenixAPI | Prefix: `' + prefix + '`')
                .setColor(embedColor)
                .setDescription('`account`, `ban`, `deop`, `dynip`, `execute`, `help`, `info`, `list`, `log`, `op`, `pardon`, `ram`, `restart`, `servers`, `start`, `status`, `stop`, `whitelist`')
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL()) 
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'account'){
            const helpAccountEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${account.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:account.description},
                    {name:'Usage', value:account.usage},
                    {name:'Required permission', value:account.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpAccountEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'ban'){
            const helpBanEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${ban.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:ban.description},
                    {name:'Usage', value:ban.usage},
                    {name:'Required permission', value:ban.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpBanEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'deop'){
            const helpDeopEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${deop.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:deop.description},
                    {name:'Usage', value:deop.usage},
                    {name:'Required permission', value:deop.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpDeopEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'dynip'){
            const helpDynipEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${dynip.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:dynip.description},
                    {name:'Usage', value:dynip.usage},
                    {name:'Required permission', value:dynip.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpDynipEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'execute'){
            const helpExecuteEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${execute.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:execute.description},
                    {name:'Usage', value:execute.usage},
                    {name:'Required permission', value:execute.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpExecuteEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'help'){
            const helpHelpEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {help}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:'Display the list of commands or get information about a single command.'},
                    {name:'Usage', value:'`'+prefix+'help {command}`'},
                    {name:'Required permission', value:'`None`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpHelpEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'info'){
            const helpInfoEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${info.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:info.description},
                    {name:'Usage', value:info.usage},
                    {name:'Required permission', value:info.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpInfoEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'list'){
            const HelpListEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${list.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:list.description},
                    {name:'Usage', value:list.usage},
                    {name:'Required permission', value:list.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(HelpListEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'log'){
            const helpLogEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${log.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:log.description},
                    {name:'Usage', value:log.usage},
                    {name:'Required permission', value:log.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpLogEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'op'){
            const helpOpEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${op.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:op.description},
                    {name:'Usage', value:op.usage},
                    {name:'Required permission', value:op.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpOpEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'pardon'){
            const helpPardonEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${pardon.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:pardon.description},
                    {name:'Usage', value:pardon.usage},
                    {name:'Required permission', value:pardon.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpPardonEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'ram'){
            const helpRamEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${ram.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:ram.description},
                    {name:'Usage', value:ram.usage},
                    {name:'Required permission', value:ram.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpRamEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'restart'){
            const HelpRestartEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${restart.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:restart.description},
                    {name:'Usage', value:restart.usage},
                    {name:'Required permission', value:restart.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(HelpRestartEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'servers'){
            const helpServersEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${servers.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:servers.description},
                    {name:'Usage', value:servers.usage},
                    {name:'Required permission', value:servers.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpServersEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'start'){
            const helpStartEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${start.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:start.description},
                    {name:'Usage', value:start.usage},
                    {name:'Required permission', value:start.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpStartEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'status'){
            const helpStatusEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${status.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:status.description},
                    {name:'Usage', value:status.usage},
                    {name:'Required permission', value:status.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpStatusEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'stop'){
            const helpStopEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${stop.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:stop.description},
                    {name:'Usage', value:stop.usage},
                    {name:'Required permission', value:stop.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpStopEmbed)
            return
        }
        else if(args[0].toLowerCase() == 'whitelist'){
            const helpWhitelistEmbed = new Discord.MessageEmbed()
                .setTitle(`Help for command {${execute.name}}`)
                .setColor(embedColor)
                .addFields(
                    {name:'Description', value:whitelist.description},
                    {name:'Usage', value:whitelist.usage},
                    {name:'Required permission', value:whitelist.permission}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
            console.log(msg.content + ' | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(helpWhitelistEmbed)
            return
        }
    }
}