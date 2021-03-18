const Discord = require('discord.js');
const config = require('./config.json')
const {Client} = require('exaroton');
const bot = new Discord.Client();
const exarotonClient = new Client(config.exarotonAPIkey);
const prefix = config.prefix
let server = exarotonClient.server(config.exarotonServerID);


bot.on('ready', () => {
    console.log('Bot online')
    bot.user.setActivity('exaroton servers', {type: 'WATCHING'})
    let generalChannel = bot.channels.cache.get(config.generalChannelID)
    generalChannel.send(" Hey, I'm back!")
    console.log('Guilds: '+ bot.guilds.cache.size)
})

bot.on('message', (msg)=>{

    if(msg.content.startsWith(prefix + 'help')){
        const args = msg.content.split(" ");
        if(args[2] == undefined) {
            const helpEmbed = new Discord.MessageEmbed()
                .setTitle('PhoenixAPI | Prefix: `' + prefix + '`')
                .setColor('#19ba19')
                .setDescription('`account`, `ban`, `execute`, `log`, `op`, `ram`, `restart`, `server`, `start`, `stop`, `support`, `whitelist`')
                .setFooter(msg.author.username+'#'+msg.author.discriminator) 
            console.log('API help | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpEmbed)
        }

        if(args[2] == 'account'){
            const accountHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `account`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Get information about the exaroton account.'},
                    {name:'Usage', value: '`' + prefix + 'account`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)   
            console.log('API help account | User: ' + msg.author.username+'#'+msg.author.discriminator) 
            msg.channel.send(accountHelpEmbed)
        }

        if(args[2] == 'ban'){
            const banHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ban`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Add users to the list of banned players.'},
                    {name: 'Usage', value: '`' + prefix + 'ban {add/remove} {Minecraft username}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help ban | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(banHelpEmbed)
        }

        if(args[2] == 'execute'){
            const executeHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `execute`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Execute commands.'},
                    {name: 'Usage', value: '`' + prefix + 'execute`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help execute | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(executeHelpEmbed)
        }

        if(args[2] == 'log'){
            const logHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `log`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Get server log using https://mclo.gs/.'},
                    {name:'Usage', value: '`' + prefix + 'log`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help log | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(logHelpEmbed)
        }

        if(args[2] === 'op'){
            const opHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `op`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Add players to the list of opped players.'},
                    {name: 'Usage', value: '`' + prefix + 'op {add/remove} {Minecraft username}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help op | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(opHelpEmbed)
        }

        if(args[2] == 'ram'){
            const ramHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ram`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Get or set the RAM for server '},
                    {name: 'Usage', value: 'Get RAM: `' + prefix + 'ram check` \n Set RAM: `' + prefix + 'ram set {2-16}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help ram | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(ramHelpEmbed)
        }

        if(args[2] == 'restart'){
            const restartHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `restart`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Restart your server.'},
                    {name:'Usage', value: '`' + prefix + 'restart`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help restart | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(restartHelpEmbed)
        }

        if(args[2] == 'server'){
            const serverHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `server`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Give the current server status.'},
                    {name:'Usage', value: '`' + prefix + 'server`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help server | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(serverHelpEmbed)
        }

        if(args[2] == 'start'){
            const startHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `start`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Start the Minecraft server.'},
                    {name:'Usage', value: '`' + prefix + 'start`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help start | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(startHelpEmbed)
        }

        if(args[2] == 'stop'){
            const stopHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `stop`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Stop the Minecraft server.'},
                    {name:'Usage', value:'`' + prefix + 'stop`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help stop | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(stopHelpEmbed)
        }

        if(args[2] == 'support'){
            const supportHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `support`')
                .setColor('#19ba19')
                .addFields(
                    {name:'Description', value:'Give useful links about the exaroton API.'},
                    {name:'Usage', value:'`' + prefix + 'support`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help support | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(supportHelpEmbed)
        }
        
        
        if(args[2] == 'whitelist'){
            const whitelistHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Help for command `whitelist`')
            .setColor('#19ba19')
            .addFields(
                {name: 'Description', value: 'Add players to the whitelist.'},
                {name: 'Usage', value: '`' + prefix + 'whitelist {add/remove} {Minecraft username}`'}
            )
            .setTimestamp()
            .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help whitelist | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(whitelistHelpEmbed)
        }
    }

    if(msg.content.startsWith(prefix + 'account')){
        async function APIaccount() {
            let account = await exarotonClient.getAccount();
            if (account.verified == true) {
                embedDescription = 'verified'
            } else if (account.verified == false) {
                embedDescription = 'not verified'
            }
            const AccountEmbed = new Discord.MessageEmbed()
                .setTitle('exaroton account')
                .setAuthor(account.name)
                .setColor('#19ba19')
                .setDescription('This account is ' + embedDescription + ' and has `' + account.credits + '` credits.')
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API account | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(AccountEmbed)
        }
        APIaccount();    
    }

    if(msg.content.startsWith(prefix + "ban")){
        const args = msg.content.split(" ");
        if(args[2] === undefined){
            const helpBanEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ban`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Add players to the list of banned players.'},
                    {name: 'Usage', value: '`' + prefix + 'ban {add/remove} {Minecraft username}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API ban | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpBanEmbed)
        }

        if(msg.member.hasPermission('ADMINISTRATOR')) {
            if(args[2] === "add"){
                if(args[3] === undefined){
                    msg.channel.send('Please specify a player!')
                }
                
                if(args[3] !== undefined){
                    async function APIBanAdd(){     
                    let list = server.getPlayerList("banned-players")
                    await list.addEntry(args[3])
                    msg.channel.send('User **'+args[3]+'** was added to the list of banned players.')
                    console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' added ' + args[3] + ' to the list of banned players.')
                    }
                    APIBanAdd();
                }
            }

            if(args[2] === "remove"){
                if(args[3] === undefined){
                    msg.channel.send('Please specify a player!')
                }
                
                if(args[3] !== undefined){
                    async function APIBanRemove(){
                        let list = server.getPlayerList("banned-players")
                        await list.deleteEntry(args[3])
                        msg.channel.send('User **'+args[3]+'** was removed from the list of banned players.')
                        console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' removed ' + args[3] + ' from the list of banned players.')
                    }
                    APIBanRemove();
                }
            }
        }

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to ban users!')
    }
    
    if(msg.content.startsWith(prefix + 'execute')){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            async function APIExecute() {
                const executeMsg = await msg.channel.send('Trying to execute commands...')
                console.log('API execute | User: ' + msg.author.username+'#'+msg.author.discriminator)
                try {
                    await server.executeCommand('say Executing commands through API...')
                    await server.executeCommand('save-all');
                    await server.executeCommand('insert Minecraft command here');

                    await executeMsg.edit('Commands executed succesfully')
                } catch (e) {
                    console.error('An error ocurred while executing commands: '+ e.message);
                    await executeMsg.edit('An error ocurred while executing command: `' + e.message + '`');
                }    
            }
            APIExecute();
        
        }
        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to execute commands!')
    }
    
    if(msg.content.startsWith(prefix + 'log')){
        async function APILog() {
            const logMsg = await msg.channel.send('Getting log from server...')
            let logs = await server.shareLogs();
            logMsg.edit('**Server log:** ' + logs)
            console.log('API log | User: ' + msg.author.username+'#'+msg.author.discriminator + ' | link: ' + logs )
        }
        APILog();
    }

    if(msg.content.startsWith(prefix + 'op')){
        const args = msg.content.split(" ");
        if(args[2] === undefined){
            const helpOPEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `op`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Add players to the list of opped players.'},
                    {name: 'Usage', value: '`' + prefix + 'op {add/remove} {Minecraft username}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API op | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpOPEmbed)
        }

        if(msg.member.hasPermission('ADMINISTRATOR')) {
            if(args[2] === "add"){
                if(args[3] === undefined){
                    msg.channel.send('Please specify a player!')
                }

                if(args[3] !== undefined){
                    async function APIOPAdd(){
                    let list = server.getPlayerList("ops")
                    await list.addEntry(args[3])
                    msg.channel.send('User **'+args[3]+'** was added to the list of OPs.')
                    console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' added ' + args[3] + ' to the list of opped players.')
                    }
                    APIOPAdd();
                }
            }

            if(args[2] === "remove"){
                if(args[3] === undefined){
                    msg.channel.send('Please specify a player!')
                }
                
                if(args[3] !== undefined){
                    async function APIOPRemove(){
                        let list = server.getPlayerList("ops")
                        await list.deleteEntry(args[3])
                        msg.channel.send('User **'+args[3]+'** was removed from the list of opped players.')
                        console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' removed ' + args[3] + ' from the list of opped players.')
                    }
                    APIOPRemove();
                }
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to op users!')
        }
    }

    if(msg.content.startsWith(prefix + 'ram')) {
        const args = msg.content.split(" ");
        if(args[2] === undefined){
            const helpRAMEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ram`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Get or set the RAM for server '},
                    {name: 'Usage', value: 'Get RAM: `' + prefix + 'ram check` \n Set RAM: `' + prefix + 'ram set {2-16}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API ram | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpRAMEmbed)
        }

        if(args[2] === 'check'){
            async function APIRAMGet() {
                try {
                    let ram = await server.getRAM();
                    msg.channel.send("This server has " + ram + " GB RAM.");
                    console.log('API ram check | User: ' + msg.author.username+'#'+msg.author.discriminator)
                } catch (e) {
                    console.error('Error while checking server RAM: ' + e.message);
                    msg.channel.send('An error occured while getting RAM: `' + e.message + '`.')   
                }
            }   
            APIRAMGet();
        }

        if(args[2] === 'set'){
            async function APIRAMSet() {
                try {
                    await server.setRAM(args[3]);
                    msg.channel.send('RAM has been set to `' + args[3] + '`.')
                    console.log(msg.author.username+'#'+msg.author.discriminator + ' set RAM to ' + args[3])
                } catch (e) {
                    msg.channel.send('An error ocrrued while setting RAM: `' + e.message + '`')
                    console.error('Error while setting RAM: ' +e.message);
                }
            }
            APIRAMSet();
        }

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to check/change the RAM!')
    }

    if(msg.content.startsWith(prefix + 'restart')){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            async function APIRestart() {
                const restartMsg = await msg.channel.send('Trying to restart server...')
                console.log(msg.author.username+'#'+msg.author.discriminator + ' used "API restart", preparing to restart the server...')
                try {
                    await server.restart();
                    await restartMsg.edit('Server should be restarting right now.')
                } catch (e) {
                    console.error('An error ocurred while restarting the server: ' + e.message);
                    await restartMsg.edit('An error ocurred while restarting the server: `' + e.message + '`')
                }
            }
            APIRestart();
        }

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to restart the server!')
    }

    if(msg.content.startsWith(prefix + 'server')){
        async function APIserver() {
            await server.get();
            if (server.hasStatus(server.STATUS.ONLINE)) {
                currentStatus = 'online'
            } else if (server.hasStatus(server.STATUS.PREPARING)) {
                currentStatus = 'preparing'
            } else if (server.hasStatus(server.STATUS.STARTING)) {
                currentStatus = 'starting'
            } else if (server.hasStatus(server.STATUS.LOADING)) {
                currentStatus = 'loading'
            } else if (server.hasStatus(server.STATUS.RESTARTING)) {
                currentStatus = 'restarting'
            } else if (server.hasStatus(server.STATUS.PENDING)) {
                currentStatus = 'pending'
            } else if (server.hasStatus(server.STATUS.CRASHED)) {
                currentStatus = 'crashed'
            } else if (server.hasStatus(server.STATUS.STOPPING)){
                currentStatus = 'stopping'
            } else if (server.hasStatus(server.STATUS.SAVING)) {
                currentStatus = 'saving'
            } else if(server.hasStatus(server.STATUS.OFFLINE)) {
                currentStatus = 'offline'
            }
            const ServerEmbed = new Discord.MessageEmbed()
                .setAuthor(server.address)
                .setColor('#19ba19')
                .setDescription('Current Status: **' + currentStatus + '.** \n**' + server.players.count + '/' + server.players.max + '** players playing in **'+ server.software.name + ' ' + server.software.version + '.**')
                .setTimestamp()
                .setFooter('#'+server.id)
            msg.channel.send(ServerEmbed)
            console.log('API server | User: ' + msg.author.username+'#'+msg.author.discriminator)
        }
        APIserver();
    }
    
    if(msg.content.startsWith(prefix + 'start')){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            async function APIStart() {
                const startMsg = await msg.channel.send('Trying to start the server...')
                console.log(msg.author.username+'#'+msg.author.discriminator+ ' used "API start", preparing to start the server...')
                try {
                    await server.start()
                    await startMsg.edit('Server should be online soon.')
                } catch (e) {
                    console.error('An error ocurred while starting the server: ' + e.message);
                    await startMsg.edit('An error ocurred while starting the server: `' + e.message + '`')
                }
            }
            APIStart();
        }

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to start the server!')
    }
    
    if(msg.content.startsWith(prefix + 'stop')){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            async function APIStop() {;
                const stopMsg = await msg.channel.send('Trying to stop server...')
                console.log(msg.author.username+'#'+msg.author.discriminator +' used "API stop", preparing to stop the server...')
                try {
                    await server.stop();
                    await stopMsg.edit('Server should be offline soon.')
                } catch (e) {
                    console.error('An error ocurred while stopping the server: ' + e.message);
                    await stopMsg.edit('An error ocurred while stopping the server: `' + e.message + '`')
                }
            }
            APIStop();
        }

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to stop the server!')
    }

    if(msg.content.startsWith(prefix + 'support')){
        console.log('API support | User: ' + msg.author.username+'#'+msg.author.discriminator)
        msg.channel.send('Reference: https://support.exaroton.com/hc/en-us/articles/360011926177-API-documentation')
    }

    if(msg.content.startsWith(prefix + "whitelist")){
        const args = msg.content.split(" ");
        if(args[2] === undefined){
            const helpWhitelistEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `whitelist`')
                .setColor('#19ba19')
                .addFields(
                    {name: 'Description', value: 'Add players to the whitelist.'},
                    {name: 'Usage', value: '`' + prefix + 'whitelist {add/remove} {Minecraft username}`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API whitelist | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpWhitelistEmbed)
        }

        if(args[2] === 'add'){
            if(args[3] === undefined){
                msg.channel.send('Pleasy specify an user!')
            }

            if(args[3] !== undefined) {
                async function APIWhitelistAdd(){
                let list = server.getPlayerList("whitelist")
                await list.addEntry(args[3])
                msg.channel.send('User **'+args[3]+'** was added to the list of whitelisted players.')
                console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' added ' + args[3] + ' to the list of whitelisted players.')
                }   
                APIWhitelistAdd();
            }
        }

        if(args[2] === 'remove'){
            if(args[3] === undefined){
                msg.channel.send('Please specify a player!')
            }

            if(args[3] !== undefined){
                async function APIWhitelistRemove(){
                let list = server.getPlayerList("whitelist")
                await list.deleteEntry(args[3])
                msg.channel.send('User **' + args[3] + '** was removed from the list of whitelisted players.')
                console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' removed ' + args[3] + ' from the list of whitelisted players.')
                }
                APIWhitelistRemove();
            }
        }
    }
})

bot.login(config.DiscordAPItoken)
