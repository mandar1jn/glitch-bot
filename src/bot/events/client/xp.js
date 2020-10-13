const path = require("path");
const fs = require("fs");
const blacklistedservers = JSON.parse(fs.readFileSync(path.resolve("src/bot/databases/blacklistedservers.json")));
const Discord = require("discord.js");

module.exports = async (client, message) => {

    if (!message.guild) {
        return;
    }

    let guild_info = JSON.parse(fs.readFileSync(path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`)));

    if (!guild_info.prefix) {
        guild_info = {
            prefix: process.env.PREFIX
        };
    }

    fs.writeFile(
        path.resolve(`src/bot/databases/guild info/${message.guild.id}.json`),
        JSON.stringify(guild_info), function(err) {
            if (err) {
                console.log("error", err);
            }
        });

    if (!blacklistedservers[message.guild.id]) {
        blacklistedservers[message.guild.id] = false;
        fs.writeFile(
            path.resolve("src/bot/databases/blacklistedservers.json"),
            JSON.stringify(blacklistedservers), function(err) {
                if (err) {
                    console.log("error", err);
                }
            });
    }

    if (blacklistedservers[message.guild.id] === true) {
        return;
    }

    if (message.mentions.has(client.user, { ignoreEveryone: true })) {
        message.channel.send(`The prefix for this server is **${guild_info.prefix}**. Do **${guild_info.prefix}help** for info about all of my commands`);
    }

    let xp = JSON.parse(fs.readFileSync(path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`)));
    let coins = JSON.parse(fs.readFileSync(path.resolve(`src/bot/databases/coins/coins-${message.guild.id}.json`)));

    let prefix = guild_info.prefix;

    if (message.author.bot) {
        return;
    }

    if (message.content.startsWith(prefix)) {
        return;
    }

    let xpAdd = Math.floor(Math.random() * 7) + 8;

    if (!xp[message.author.id]) {
        xp[message.author.id] = {
            xp: 0,
            level: 1
        };
    }

    let curxp = xp[message.author.id].xp;
    let curlvl = xp[message.author.id].level;
    let nxtLvl = curlvl * 300 * 1.2;
    xp[message.author.id].xp = curxp + xpAdd;
    if (nxtLvl <= xp[message.author.id].xp) {
        xp[message.author.id].level = curlvl + 1;
        let lvlup = new Discord.MessageEmbed()
            .setTitle("Level Up!")
            .setColor("ffd000")
            .addField("New Level", curlvl + 1);

        message.channel.send(lvlup);
    }
    fs.writeFile(
        path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`),
        JSON.stringify(xp), function(err) {
            if (err) {
                console.log("error", err);
            }
        });

    if (!coins[message.author.id]) {
        coins[message.author.id] = {
            coins: 0,
            volgende_munt: 5
        };
    }

    coins[message.author.id].volgende_munt -= 1;

    if (coins[message.author.id].volgende_munt <= 0) {
        coins[message.author.id].coins += 1;
        coins[message.author.id].volgende_munt += 5;
    }

    return fs.writeFile(
        path.resolve(`src/bot/databases/coins/coins-${message.guild.id}.json`),
        JSON.stringify(coins), function(err) {
            if (err) {
                console.log("error", err);
            }
        });
};