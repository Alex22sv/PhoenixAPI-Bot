const Discord = require('discord.js');
const config = require('../config.json');
const prefix = config.prefix;
const embedColor = config.embedColor;
const errorColor = config.errorColor;

const {Client} = require('exaroton');
const exarotonClient = new Client(config.exarotonAPIkey);

module.exports = {
    name: 'ram',
    description: 'Obtén o cambia el RAM del servidor.', 
    usage: 'Obtener RAM: `'+prefix+'ram {nombre|ID|dirección del servidor} get` \nCambiar RAM: `'+prefix+'ram {nombre|ID|dirección del servidor} set {2-16}`',
    permission: '`ADMINISTRADOR`',
    execute(msg, args){
        if(args[0] == undefined){
            const notSeverMentioned = new Discord.MessageEmbed()
                .setTitle('Error!')
                .setDescription('Tu mensaje no incluye un servidor de Minecraft. \nUsa `'+prefix+'help ram` para más información.')
                .setColor(errorColor)
            msg.channel.send(notSeverMentioned)
            return
        }

        if(args[0] != undefined){
            if(msg.member.hasPermission('ADMINISTRATOR')){
                async function APIram() {
                    if(args[1] == undefined){
                        const errorRAMembed = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('Especifica si quieres obtener o cambiar el RAM del servidor. \nUsa `'+prefix+'help ram` para más información.')
                            .setColor(errorColor)
                        msg.channel.send(errorRAMembed)
                        return
                    }
                    if(args[1].toLowerCase() == 'get'){
                        try {
                            let name = args[0];
                            let serverLists = await exarotonClient.getServers();
                            let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                            let serverRAM = await server.getRAM();
                            const serverRAMembed = new Discord.MessageEmbed()
                                .setDescription(`RAM del servidor **${server.name}**: ${serverRAM}GB`)
                                .setColor(embedColor)
                                .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())
                            msg.channel.send(serverRAMembed);
                        } catch (e) {
                            console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                            console.error('An error occurred while using "ram" command: '+ e.message);
                            if(e.message == "Cannot read property 'getRAM' of undefined") {
                                const serverNotFoundEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                                    .setColor(errorColor)
                                msg.channel.send(serverNotFoundEmbed)
                            } else{
                                const errorEmbed = new Discord.MessageEmbed()
                                    .setTitle('Error!')
                                    .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                                    .setColor(errorColor)
                                msg.channel.send(errorEmbed)
                            }
                        }
                    } else if(args[1].toLowerCase() == 'set'){
                        if(args[2] == undefined){
                            const notRAMdefined = new Discord.MessageEmbed()
                                .setTitle('Error!')
                                .setDescription('Debes especificar la nueva cantidad de RAM del servidor. \nUsa `'+prefix+'help ram` para más información.')
                                .setColor(errorColor)
                            msg.channel.send(notRAMdefined)
                            return
                        } else{
                            try {
                                let name = args[0];
                                let serverLists = await exarotonClient.getServers();
                                let server = serverLists.find(server => server.name === name || server.id === name || server.address === name);
                                let serverRAM = await server.getRAM()
                                await server.setRAM(args[2]);     
                                const ramChangedEmbed = new Discord.MessageEmbed()
                                    .setDescription(`El RAM del servidor **${server.name}** ha cambiado de ${serverRAM}GB a ${args[2]}GB.`)  
                                    .setColor(embedColor)   
                                    .setFooter(msg.author.username+'#'+msg.author.discriminator, msg.member.user.displayAvatarURL())                     
                                msg.channel.send(ramChangedEmbed)
                                console.log(msg.author.username+'#'+msg.author.discriminator + ` ha cambiado el RAM del servidor "${args[0]}" de ${serverRAM}GB a ${args[2]}GB.`)
                            } catch (e) {
                                console.log(msg.content + ' | Usuario: ' + msg.author.username+'#'+msg.author.discriminator)
                                console.error('Error al usar el comando "ram": ' +e.message);
                                if(e.message == "Cannot read property 'getRAM' of undefined") {
                                    const serverNotFoundEmbed = new Discord.MessageEmbed()
                                        .setTitle('Error!')
                                        .setDescription(`El servidor "${args[0]}" no ha sido encontrado.`)
                                        .setColor(errorColor)
                                    msg.channel.send(serverNotFoundEmbed)
                                }
                                else if(e.message == "Ram must be in range 2 <= ram <= 16"){
                                    const notValidParameter = new Discord.MessageEmbed()
                                        .setTitle('Error!')
                                        .setDescription('El RAM debe de estar en un rango de 2-16GB.')
                                        .setColor(errorColor)
                                    msg.channel.send(notValidParameter)
                                } else{
                                    const errorEmbed = new Discord.MessageEmbed()
                                        .setTitle('Error!')
                                        .setDescription('Ocurrió un error al ejecutar ese comando: `' + e.message + '`')
                                        .setColor(errorColor)
                                    msg.channel.send(errorEmbed)
                                }
                            }
                        }
                    } else{
                        const optionNotFound = new Discord.MessageEmbed()
                            .setTitle('Error!')
                            .setDescription('"'+args[1]+'" no es una opción válida. \nUsa `'+prefix+ 'help ram` para más información.')
                            .setColor(errorColor)
                        msg.channel.send(optionNotFound)
                        return
                    }
                }
                APIram();
            }
            if(!msg.member.hasPermission('ADMINISTRATOR'))  {
                const MissingPermissionsEmbed = new Discord.MessageEmbed()
                    .setTitle('Error!')
                    .setDescription('Necesitas el permiso `Administrador` para ejecutar ese comando.')
                    .setColor(errorColor)
                msg.channel.send(MissingPermissionsEmbed)
            }
        }
    }
}
