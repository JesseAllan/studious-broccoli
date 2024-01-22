(async () => {
    // default imports
    const events = require('events');
    const {
        exec
    } = require("child_process")
    const logs = require("discord-logs")
    const Discord = require("discord.js")
    const {
        MessageEmbed,
        MessageButton,
        MessageActionRow,
        Intents,
        Permissions,
        MessageSelectMenu
    } = require("discord.js")
    const fs = require('fs');
    let process = require('process');
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // block imports
    const os = require("os-utils");
    let https = require("https")
    const synchronizeSlashCommands = require('@frostzzone/discord-sync-commands');
    const S4D_WEBSITECREATION_EXPRESS = require('express')
    const S4D_WEBSITECREATION_bodyParser = require('body-parser');
    const S4D_WEBSITECREATION_cors = require('cors');
    var S4D_WEBSITECREATION_path = require('path');
    const S4D_WEBSITECREATION_EXPRESS_app = S4D_WEBSITECREATION_EXPRESS();

    // define s4d components (pretty sure 90% of these arnt even used/required)
    let s4d = {
        Discord,
        fire: null,
        joiningMember: null,
        reply: null,
        player: null,
        manager: null,
        Inviter: null,
        message: null,
        notifer: null,
        checkMessageExists() {
            if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
            if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
        }
    };

    // check if d.js is v13
    if (!require('./package.json').dependencies['discord.js'].startsWith("^13.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord.js'] = '^13.16.0'
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
        exec('npm i')
        throw new Error("Seems you arent using v13 please re-run or run `npm i discord.js@13.16.0`");
    }

    // check if discord-logs is v2
    if (!require('./package.json').dependencies['discord-logs'].startsWith("^2.")) {
        let file = JSON.parse(fs.readFileSync('package.json'))
        file.dependencies['discord-logs'] = '^2.0.0'
        fs.writeFileSync('package.json', JSON.stringify(file, null, 4))
        exec('npm i')
        throw new Error("discord-logs must be 2.0.0. please re-run or if that fails run `npm i discord-logs@2.0.0` then re-run");
    }

    // create a new discord client
    s4d.client = new s4d.Discord.Client({
        intents: [
            Object.values(s4d.Discord.Intents.FLAGS).reduce((acc, p) => acc | p, 0)
        ],
        partials: [
            "REACTION",
            "CHANNEL"
        ]
    });

    // when the bot is connected say so
    s4d.client.on('ready', () => {
        console.log(s4d.client.user.tag + " is alive!")
    })

    // upon error print "Error!" and the error
    process.on('uncaughtException', function(err) {
        console.log('Error!');
        console.log(err);
    });

    // give the new client to discord-logs
    logs(s4d.client);

    // pre blockly code


    // blockly code
    var prefix, arguments2, commandwithprefix, command;


    await s4d.client.login('MTE4NzEyODUwMzEwNDE5MjUyMg.Gwqij9.gie0zVnJbLGAyXDGGIyzjmUQTNLLjfYNXrbQVo').catch((e) => {
        const tokenInvalid = true;
        const tokenError = e;
        if (e.toString().toLowerCase().includes("token")) {
            throw new Error("An invalid bot token was provided!")
        } else {
            throw new Error("Privileged Gateway Intents are not enabled! Please go to https://discord.com/developers and turn on all of them.")
        }
    });

    s4d.client.on('ready', async () => {
        prefix = '!';
        s4d.client.user.setPresence({
            status: "dnd",
            activities: [{
                name: 'brickyblox with Jesse Allan',
                type: "PLAYING"
            }]
        });

    });

    const http = require('http');
    const server = http.createServer((req, res) => {
        res.writeHead(200);
        res.end('This site was created to keep bot on 24/7');
    });
    server.listen(3000);

    s4d.client.on('messageCreate', async (s4dmessage) => {
        arguments2 = (s4dmessage.content).split(' ');
        commandwithprefix = arguments2.splice(0, 1)[0];
        if ((commandwithprefix || '').startsWith(prefix || '')) {
            command = commandwithprefix.slice(((prefix.length + 1) - 1), commandwithprefix.length);
            if (command == 'say') {
                s4dmessage.channel.send({
                    content: String('')
                });
                s4dmessage.reply({
                    content: String((arguments2.join(' '))),
                    allowedMentions: {
                        repliedUser: true
                    }
                });
            }
        }

    });

    synchronizeSlashCommands(s4d.client, [{
        name: 'moderation',
        description: 'just a bunch of moderation commands',
        options: [{
            type: 2,
            name: 'kick',

            description: 'kick a member in the current server',
            options: [

            ]
        }, ]
    }, ], {
        debug: false,

    });

    /* IMPORTED - S4D Website Hosting Dependencies */
    let S4D_APP_WEBSITE_HOSTING_PORT = 8080

    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_cors());
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.urlencoded({
        extended: false
    }));
    S4D_WEBSITECREATION_EXPRESS_app.use(S4D_WEBSITECREATION_bodyParser.json());

    S4D_WEBSITECREATION_EXPRESS_app.get('/bot.htm', async function(req, res) {
        res.sendFile(S4D_WEBSITECREATION_path.join(__dirname, String('index.html')))

    })


    S4D_WEBSITECREATION_EXPRESS_app.listen(S4D_APP_WEBSITE_HOSTING_PORT);
    return s4d
})();
