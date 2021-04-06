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
                .setColor(config.embedColor)
                .setDescription('`account`, `ban`, `execute`, `info`, `list`, `log`, `op`, `players`, `ram`, `restart`, `servers`, `status`, `start`, `stop`, `whitelist`')
                .setFooter(msg.author.username+'#'+msg.author.discriminator) 
            console.log('API help | ' +  'User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpEmbed)
        }

        if(args[2] == 'account'){
            const accountHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `account`')
                .setColor(config.embedColor)
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
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Add players to the list of banned players.'},
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
                .setColor(config.embedColor)
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

        if(args[2] == 'info'){
            const infoHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `info`')
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Get information about PhoenixAPI.'},
                    {name:'Usage', value:'`' + prefix + 'info`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help info | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(infoHelpEmbed)
        }

        if(args[2] == 'list'){
            const listHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `list`')
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Get players from lists.'},
                    {name:'Usage:', value: '`' + prefix + 'list {whitelist/ops/banned}`'},
                    {name:'Required permission', value:'`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help list | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(listHelpEmbed)
        }

        if(args[2] == 'log'){
            const logHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `log`')
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Get server log using https://mclo.gs/.'},
                    {name:'Usage', value: '`' + prefix + 'log`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help log | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(logHelpEmbed)
        }

        if(args[2] == 'op'){
            const opHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `op`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Add players to the list of ops players.'},
                    {name: 'Usage', value: '`' + prefix + 'op {add/remove} {Minecraft username}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help op | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(opHelpEmbed)
        }

        if(args[2] == 'players'){
            const opHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `players`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Check the current players playing on the server.'},
                    {name: 'Usage', value: '`' + prefix + 'players {server name}`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help players | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(opHelpEmbed)
        }

        if(args[2] == 'ram'){
            const ramHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ram`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Get or set the RAM for server.'},
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
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Restart your server.'},
                    {name:'Usage', value: '`' + prefix + 'restart`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help restart | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(restartHelpEmbed)
        }

        if(args[2] == 'servers'){
            async function APIServers(){
                const serversHelpEmbed = new Discord.MessageEmbed()
                    .setTitle('Help for command `servers`')
                    .setColor(config.embedColor)
                    .addFields(
                        {name:'Description', value:'Get the list of servers available in the account'},
                        {name:'Usage', value:'`' + prefix + 'servers`'}
                    )
                    .setTimestamp()
                    .setFooter(msg.author.username+'#'+msg.author.discriminator)
                console.log('API help servers | User: ' + msg.author.username+'#'+msg.author.discriminator)
                msg.channel.send(serversHelpEmbed)
            }
            APIServers();
        }

        if(args[2] == 'status'){
            const statusHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `status`')
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Give the current status of the given server.'},
                    {name:'Usage', value: '`' + prefix + 'status {server name}`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help status | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(statusHelpEmbed)
        }

        if(args[2] == 'start'){
            const startHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `start`')
                .setColor(config.embedColor)
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
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Stop the Minecraft server.'},
                    {name:'Usage', value:'`' + prefix + 'stop`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API help stop | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(stopHelpEmbed)
        }
        
        if(args[2] == 'whitelist'){
            const whitelistHelpEmbed = new Discord.MessageEmbed()
            .setTitle('Help for command `whitelist`')
            .setColor(config.embedColor)
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
                .setColor(config.embedColor)
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
        if(args[2] == undefined){
            const helpBanEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ban`')
                .setColor(config.embedColor)
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
        
        if(args[2] == "add"){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                if(args[3] == undefined){
                    msg.channel.send('Please specify a player!')
                }
                
                if(args[3] != undefined){
                    async function APIBanAdd(){     
                    let list = server.getPlayerList("banned-players")
                    await list.addEntry(args[3])
                    msg.channel.send('User **'+args[3]+'** was added to the list of banned players.')
                    console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' added ' + args[3] + ' to the list of banned players.')
                    }
                    APIBanAdd();
                }
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to ban players!')
        }

        if(args[2] == "remove"){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                if(args[3] == undefined){
                    msg.channel.send('Please specify a player!')
                }
                
                if(args[3] != undefined){
                    async function APIBanRemove(){
                        let list = server.getPlayerList("banned-players")
                        await list.deleteEntry(args[3])
                        msg.channel.send('User **'+args[3]+'** was removed from the list of banned players.')
                        console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' removed ' + args[3] + ' from the list of banned players.')
                    }
                    APIBanRemove();
                }
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to ban players!')
        }
    }
    
    if(msg.content.startsWith(prefix + 'execute')){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            async function APIExecute() {
                const executeMsg = await msg.channel.send('Trying to execute commands...')
                console.log('API execute | User: ' + msg.author.username+'#'+msg.author.discriminator)
                try {
                    await server.executeCommand('say Executing commands through API...')
                    await server.executeCommand('save-all');

                    await executeMsg.edit('Commands executed succesfully.')
                } catch (e) {
                    console.error('An error ocurred while executing commands: '+ e.message);
                    await executeMsg.edit('An error ocurred while executing command: `' + e.message + '`');
                }    
            }
            APIExecute();
        
        }

        if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to execute commands!')
    }
    
    if(msg.content.startsWith(prefix + 'info')){
        const infoEmbed = new Discord.MessageEmbed()
            .setTitle('PhoenixAPI#4772')
            .setDescription('PhoenixAPI is a bot developed with discord.js. The main reason of this bot is the managment of [exaroton](https://exaroton.com/) servers using the exaroton API.')
            .setColor(config.embedColor)
            .addFields(
                {name:'Owner', value:'`Alex22#7756`', inline:true},
                {name:'Current version', value:'`1.2.1`', inline:true},
                {name:'Prefix', value:'`'+prefix+'`', inline:true},
                {name:'Links', value:'[GitHub](https://github.com/Alex0622/PhoenixAPI-Bot) | [exaroton API documentation](https://support.exaroton.com/hc/en-us/articles/360011926177-API-documentation)', inline:false}
            )
            .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API info | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(infoEmbed)
    }

    if(msg.content.startsWith(prefix + 'list')) {
        const args = msg.content.split(" ");
        if(args[2] == undefined){
            const listHelpEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `list`')
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Get players from lists.'},
                    {name:'Usage:', value: '`' + prefix + 'list {whitelist/ops/banned}`'},
                    {name:'Required permission', value:'`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API list | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(listHelpEmbed)
        }
        
        if(args[2] == 'whitelist'){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                async function APIListWhitelist(){
                    try {
                        let listWhitelist = server.getPlayerList("whitelist");
                        let entriesWhitelist = await listWhitelist.getEntries();
                        const listWhitelistEmbed = new Discord.MessageEmbed()
                            .setTitle('Whitelisted players')
                            .addFields({name:'Players', value:entriesWhitelist})
                            .setColor(config.embedColor)
                            .setTimestamp()
                            .setFooter(msg.author.username+'#'+msg.author.discriminator)
                        console.log('API list whitelist | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        msg.channel.send(listWhitelistEmbed);
                    } catch (e) {
                        console.error('An error ocurred while getting list "whitelist": ' + e.message);
                        if (e.message == 'MessageEmbed field values may not be empty.')
                            msg.channel.send('There are no players in that list!')
                        else{
                            msg.channel.send('An error ocurred while getting that list: `'+e.message+'`')
                        }
                    }
                }
                APIListWhitelist();      
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to get that list of players!')
        }

        if(args[2] == 'ops'){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                async function APIListOPs(){
                    try {
                        let listOPs = server.getPlayerList("ops");
                        let entriesOPs = await listOPs.getEntries();
                        const listOPsEmbed = new Discord.MessageEmbed()
                            .setTitle('Ops players')
                            .addFields({name:'Players', value:entriesOPs})
                            .setColor(config.embedColor)
                            .setTimestamp()
                            .setFooter(msg.author.username+'#'+msg.author.discriminator)
                        console.log('API list ops | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        msg.channel.send(listOPsEmbed);
                    } catch (e) {
                        console.error('An error ocurred while getting list "whitelist": ' + e.message);
                        if (e.message == 'MessageEmbed field values may not be empty.')
                            msg.channel.send('There are no players in that list!')
                        else{
                            msg.channel.send('An error ocurred while getting that list: `'+e.message+'`')
                        }
                    }
                }
                APIListOPs();
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to get that list of players!')
        }

        if(args[2] == 'banned'){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                async function APIListBanned(){
                    try {
                        let listBanned = server.getPlayerList("banned-players");
                        let entriesBanned = await listBanned.getEntries();
                        const listBannedEmbed = new Discord.MessageEmbed()
                            .setTitle('Banned players')
                            .addFields({name:'Players', value:entriesBanned})
                            .setColor(config.embedColor)
                            .setTimestamp()
                            .setFooter(msg.author.username+'#'+msg.author.discriminator)
                        console.log('API list banned | User: ' + msg.author.username+'#'+msg.author.discriminator)
                        msg.channel.send(listBannedEmbed);
                    } catch (e) {
                        console.error('An error ocurred while getting list "whitelist": ' + e.message);
                        if (e.message == 'MessageEmbed field values may not be empty.')
                            msg.channel.send('There are no players in that list!')
                        else{
                            msg.channel.send('An error ocurred while getting that list: `'+e.message+'`')
                        }
                    }
                }
                APIListBanned();
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to get that list of players!')
        }
    }

    if(msg.content.startsWith(prefix + 'log')){
        async function APILog() {
            try {
                const logMsg = await msg.channel.send('Getting log from server...')
                let logs = await server.shareLogs();
                logMsg.edit('**Server log:** ' + logs)
                console.log('API log | User: ' + msg.author.username+'#'+msg.author.discriminator + ' | link: ' + logs )
            } catch(e) {
                console.log('Error while getting server log: ' + e.message)
                msg.channel.send('An error ocurred while getting the server log: `'+e.message+'`')
            }
        }
        APILog();
    }

    if(msg.content.startsWith(prefix + 'op')){
        const args = msg.content.split(" ");
        if(args[2] == undefined){
            const helpOPEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `op`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Add players to the list of ops players.'},
                    {name: 'Usage', value: '`' + prefix + 'op {add/remove} {Minecraft username}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API op | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpOPEmbed)
        }

        if(args[2] == "add"){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                if(args[3] == undefined){
                    msg.channel.send('Please specify a player!')
                }

                if(args[3] != undefined){
                    async function APIOPAdd(){
                    let list = server.getPlayerList("ops")
                    await list.addEntry(args[3])
                    msg.channel.send('User **'+args[3]+'** was added to the list of OPs.')
                    console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' added ' + args[3] + ' to the list of ops players.')
                    }
                    APIOPAdd();
                }
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to op players!')
        }

        if(args[2] == "remove"){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
                if(args[3] == undefined){
                    msg.channel.send('Please specify a player!')
                }
                
                if(args[3] != undefined){
                    async function APIOPRemove(){
                        let list = server.getPlayerList("ops")
                        await list.deleteEntry(args[3])
                        msg.channel.send('User **'+args[3]+'** was removed from the list of ops players.')
                        console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' removed ' + args[3] + ' from the list of ops players.')
                    }
                    APIOPRemove();
                }
            }

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to op players!')
        }
    }

    if(msg.content.startsWith(prefix + 'players')) {
        const args = msg.content.split(" ");
        if(args[2] == undefined){
            const helpPlayersEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `players`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Check the current players playing on the server.'},
                    {name: 'Usage', value: '`' + prefix + 'players {server name}`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API players | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpPlayersEmbed)
        }
        
        if(args[2] != undefined){
            async function APIPLayers() {
                try {
                    let name = args[2];
                    let serverLists = await exarotonClient.getServers();
                    let serverPlayers = serverLists.find(serverStatus => serverStatus.name === name);    
                    const embedPlayers = new Discord.MessageEmbed()                            
                        .setTitle('Players in ' + serverPlayers.name)
                        .setDescription(serverPlayers.players.list)
                        .setColor(config.embedColor)
                        .setTimestamp()
                        .setFooter(msg.author.username+'#'+msg.author.discriminator)
                    console.log('API players ' + args[2] + ' | User: ' + msg.author)
                    msg.channel.send(embedPlayers)
                    

                } catch (e){
                    console.log('Error while gettings the list of players: ' + e.message)
                    if (e.message == "Cannot read property 'name' of undefined")
                        msg.channel.send('Server not found!')
                    else{
                        msg.channel.send('An error ocurred while getting that list: `'+e.message+'`')
                }
                }
            }
            APIPLayers();
        }
    }

    if(msg.content.startsWith(prefix + 'ram')) {
        const args = msg.content.split(" ");
        if(args[2] == undefined){
            const helpRAMEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `ram`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Get or set the RAM for server.'},
                    {name: 'Usage', value: 'Get RAM: `' + prefix + 'ram check` \n Set RAM: `' + prefix + 'ram set {2-16}`'},
                    {name: 'Required permission', value: '`ADMINISTRATOR`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API ram | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpRAMEmbed)
        }

        if(args[2] == 'check'){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
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
            
            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to check the RAM!')
        }

        if(args[2] == 'set'){
            if(msg.member.hasPermission('ADMINISTRATOR')) {
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

            if(!msg.member.hasPermission('ADMINISTRATOR')) return msg.channel.send('You need the permission `Administrator` to change the RAM!')
        }
    }

    if(msg.content.startsWith(prefix + 'restart')){
        if(msg.member.hasPermission('ADMINISTRATOR')) {
            async function APIRestart() {
                const restartMsg = await msg.channel.send('Trying to restart server...')
                console.log(msg.author.username+'#'+msg.author.discriminator + ' used "API restart", preparing to restart the server...')
                try {
                    await server.executeCommand('say [API] This server will be restarted in a few seconds.');
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
    if(msg.content.startsWith(prefix + "servers")){
        async function APIServers(){
            let servers = await exarotonClient.getServers();
            for(let server of servers) {
                msg.channel.send('Sever address: `' + server.address + '`| Server ID: `' + server.id + '`')
            }
        console.log('API servers | User: ' + msg.author.username+'#'+msg.author.discriminator)
        }
        APIServers();
    }

    if(msg.content.startsWith(prefix + "status")){
        const args = msg.content.split(" ");
        if(args[2] != undefined){
            async function APIStatus(){
                let name = args[2];
                let serverLists = await exarotonClient.getServers();
                let serverStatus = serverLists.find(serverStatus => serverStatus.name === name);
                try {
                    await serverStatus.get(); 
                    if (serverStatus.hasStatus(serverStatus.STATUS.ONLINE)) {
                        currentStatus = 'online'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.PREPARING)) {
                        currentStatus = 'preparing'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.STARTING)) {
                        currentStatus = 'starting'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.LOADING)) {
                        currentStatus = 'loading'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.RESTARTING)) {
                        currentStatus = 'restarting'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.PENDING)) {
                        currentStatus = 'pending'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.CRASHED)) {
                        currentStatus = 'crashed'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.STOPPING)){
                        currentStatus = 'stopping'
                    } else if (serverStatus.hasStatus(serverStatus.STATUS.SAVING)) {
                        currentStatus = 'saving'
                    } else if(serverStatus.hasStatus(serverStatus.STATUS.OFFLINE)) {
                        currentStatus = 'offline'
                    }
                    const StatusEmbed = new Discord.MessageEmbed()
                        .setAuthor(serverStatus.address)
                        .setColor(config.embedColor)
                        .setDescription('Current status: **' + currentStatus + '.** \n**' + serverStatus.players.count + '/' + serverStatus.players.max + '** players playing in **'+ serverStatus.software.name + ' ' + serverStatus.software.version + '.**')
                        .setTimestamp()
                        .setFooter('#'+serverStatus.id)
                    msg.channel.send(StatusEmbed)
                    console.log('API status '+args[2]+ ' | User: ' +msg.author.username+"#"+msg.author.discriminator)
                }
                 catch (error) {
                    console.log('Error while getting server status: ' + error.message)
                    if(error.message == "Cannot read property 'get' of undefined"){
                        msg.channel.send('Server not found!')
                    }
                    else{
                        msg.channel.send('An error ocurred while getting server status: ' + error.message)
                    }
                }
                
            }
            APIStatus();
        }
        if(args[2] == undefined) {
            const helpStatusEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `status`')
                .setColor(config.embedColor)
                .addFields(
                    {name:'Description', value:'Give the current status of the given server.'},
                    {name:'Usage', value: '`' + prefix + 'status {server name}`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API status | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpStatusEmbed)
        }
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
                    await server.executeCommand('say [API] This server will be stopped in a few seconds.');
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

    if(msg.content.startsWith(prefix + "whitelist")){
        const args = msg.content.split(" ");
        if(args[2] == undefined){
            const helpWhitelistEmbed = new Discord.MessageEmbed()
                .setTitle('Help for command `whitelist`')
                .setColor(config.embedColor)
                .addFields(
                    {name: 'Description', value: 'Add players to the whitelist.'},
                    {name: 'Usage', value: '`' + prefix + 'whitelist {add/remove} {Minecraft username}`'}
                )
                .setTimestamp()
                .setFooter(msg.author.username+'#'+msg.author.discriminator)
            console.log('API whitelist | User: ' + msg.author.username+'#'+msg.author.discriminator)
            msg.channel.send(helpWhitelistEmbed)
        }

        if(args[2] == 'add'){
            if(args[3] == undefined){
                msg.channel.send('Pleasy specify an user!')
            }

            if(args[3] != undefined) {
                async function APIWhitelistAdd(){
                let list = server.getPlayerList("whitelist")
                await list.addEntry(args[3])
                msg.channel.send('User **'+args[3]+'** was added to the list of whitelisted players.')
                console.log('User ' + msg.author.username+'#'+msg.author.discriminator + ' added ' + args[3] + ' to the list of whitelisted players.')
                }   
                APIWhitelistAdd();
            }
        }

        if(args[2] == 'remove'){
            if(args[3] == undefined){
                msg.channel.send('Please specify a player!')
            }

            if(args[3] != undefined){
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
