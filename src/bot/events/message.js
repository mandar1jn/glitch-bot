const path = require("path")
const fs = require('fs');
const blacklistedservers = require(path.resolve('src/bot/databases/blacklistedservers.json'));
const Discord = require('discord.js');

var defaultJSON = '{}';
var guild_info = null;
var xp = null;
var munten = null;
var xpAdd = null;
var curlvl = null;
var lvlup = null;
var nxtLvl = null;
var curxp = null;

module.exports = async (client, message) => {

    if (!message.guild) return;

    if (fs.existsSync(path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`),
            defaultJSON
        );
    }

    if (fs.existsSync(path.resolve(`/src/bot/databases/xp/xp-${message.guild.id}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`),
            defaultJSON
        );
    }

    if (fs.existsSync(path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`),
            defaultJSON
        );
    }

    guild_info = require(path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`));

    if (!guild_info.prefix) {
        guild_info = {
            prefix: process.env.PREFIX
        };
    }

    fs.writeFile(
        path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`),
        JSON.stringify(guild_info)
    );

    if (!blacklistedservers[message.guild.id]) {
        blacklistedservers[message.guild.id] = false;
        fs.writeFile(
            path.resolve(`src/bot/databases/blacklistedservers.json`),
            JSON.stringify(blacklistedservers)
        );
    }

    if (blacklistedservers[message.guild.id] === true) {
        return;
    }

    if (message.mentions.has(client.user, { ignoreEveryone: true })) {
        message.channel.send(`The prefix for this server is **${guild_info.prefix}**. Do **${guild_info.prefix}help** for info about all of my commands`);
    }

    xp = require(path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`));
    munten = require(path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`));

    const prefix = guild_info.prefix;

    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) return;

    xpAdd = Math.floor(Math.random() * 7) + 8;

    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    curxp = xp[message.author.id].xp;
    curlvl = xp[message.author.id].level;
    nxtLvl = xp[message.author.id].level * 300 * 1.2;
    xp[message.author.id].xp = curxp + xpAdd;
    if (nxtLvl <= xp[message.author.id].xp) {
        xp[message.author.id].level = curlvl + 1;
        lvlup = new Discord.MessageEmbed()
            .setTitle('Level Up!')
            .setColor('ffd000')
            .addField('New Level', curlvl + 1);

        message.channel.send(lvlup);
    }
    fs.writeFile(
        path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`),
        JSON.stringify(xp)
    );

    if (!munten[message.author.id]) {
        munten[message.author.id] = {
            munten: 0,
            volgende_munt: 5
        };
    }

    munten[message.author.id].volgende_munt -= 1;

    if (munten[message.author.id].volgende_munt <= 0) {
        munten[message.author.id].munten += 1;
        munten[message.author.id].volgende_munt += 5;
    }

    fs.writeFile(
        path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`),
        JSON.stringify(munten)
    );
};
