const path = require("path")
const Discord = require('discord.js');
const fs = require('fs');
const developers = require(path.resolve(`src/bot/databases/developers.json`));
const client = new Discord.Client({
    shards: 'auto',
    disableMentions: 'everyone',
    disabledEvents: ["RELATIONSHIP_ADD", "RELATIONSHIP_REMOVE", "TYPING_START"]
});
const DBL = require('dblapi.js');
var dbl = new DBL(process.env.TOPAPI, { webhookPort: 5000, webhookAuth: "glitched" }, client);

module.exports = client;
var prefix = null;
var guild_info = null;
const utils = require(path.resolve(`src/utils.js`));

require(path.resolve(`src/bot/handlers/command.js`)).registerCommands(client);

require(path.resolve('src/bot/handlers/events.js')).registerEvents(client, dbl);

client.login(process.env.TOKEN);

module.exports = client;