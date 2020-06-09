const path = require("path")
const Discord = require('discord.js');
const fs = require('fs');
const developers = require(path.resolve(`src/bot/databases/developers.json`));
const client = new Discord.Client({
    shards: 'auto',
    disableMentions: 'everyone'
});
const DBL = require('dblapi.js');
var dbl = new DBL(process.env.TOPAPI, client);
const blacklistedservers = require(path.resolve(`src/bot/databases/blacklistedservers.json`));
module.exports = client;
var prefix = null;
var guild_info = null;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

['command'].forEach(handler => {
    require(path.resolve(`src/bot/handlers/${handler}`))(client);
});

fs.readdir(path.resolve('src/bot/events/'), (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const event = require(path.resolve(`src/bot/events/${file}`));
        let eventName = file.split('.')[0];
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(path.resolve(`src/bot/events/${file}`))];
    });
});

client.on('message', async message => {

    if (!message.guild) return;

    if (!blacklistedservers[message.guild.id]) {
        blacklistedservers[message.guild.id] = false;
        fs.writeFile(
            path.resolve(`src/bot/databases/blacklistedservers.json`),
            JSON.stringify(blacklistedservers), function(err) {
     if(err) console.log('error', err);
   });
    }

    if (fs.existsSync(path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`),
            "{}", function(err) {
                if (err) console.log('error', err);
            });
    }

    if (fs.existsSync(path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`),
            "{}", function(err) {
                if (err) console.log('error', err);
            });
    }

    if (fs.existsSync(path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`),
            "{}", function(err) {
                if (err) console.log('error', err);
            });
    }

    guild_info = require(path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`));

    if (!guild_info.prefix) {
        guild_info = {
            prefix: process.env.PREFIX
        };
    }

    fs.writeFile(
        path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`),
        JSON.stringify(guild_info), function(err) {
            if (err) console.log('error', err);
        });

    prefix = guild_info.prefix;

    if (message.author.bot) return;
    if (!message.content.toLocaleLowerCase().startsWith(prefix.toLowerCase())) return;
    if (!message.member)
        message.member = await message.guild.fetchMember(message);

    if (
        blacklistedservers[message.guild.id] === true &&
        developers[message.author.id] != true
    ) {
        return message.channel.send('This server is blacklisted!');
    }

    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
        command.run(client, message, args, dbl);
    }
});

client.login(process.env.TOKEN);