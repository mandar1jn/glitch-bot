const fs = require("fs");
const path = require("path");
const blacklistedservers = JSON.parse(fs.readFileSync(path.resolve("src/bot/databases/blacklistedservers.json")));
const developers = JSON.parse(fs.readFileSync(path.resolve("src/bot/databases/developers.json")));
const utils = require(path.resolve("src/utils.js"));


module.exports = async (client, message) => {
    if (!message.guild || !message.member) {
        return;
    }

    let guildID = message.guild.id;

    if (fs.existsSync(path.resolve(`src/bot/databases/guild info/${guildID}.json`)) !== true) {
        fs.writeFileSync(
            path.resolve("src/bot/databases/blacklistedservers.json"),
            "{}", function(err) {
                if (err) {
                    console.log("error", err);
                }
            });
    }

    if (!blacklistedservers[guildID]) {
        blacklistedservers[guildID] = false;
        fs.writeFile(
            path.resolve("src/bot/databases/blacklistedservers.json"),
            JSON.stringify(blacklistedservers), function(err) {
                if (err) {
                    console.log("error", err);
                }
            });
    }

    let guild_info = JSON.parse(fs.readFileSync(path.resolve(`src/bot/databases/guild info/${guildID}.json`)));

    await utils.validateGuildData(guildID, guild_info);

    client.emit("xp", client, message);

    let prefix = guild_info.prefix;

    if (message.author.bot || !message.content.toLowerCase().startsWith(prefix.toLowerCase())) {
        return;
    }

    if (!message.member){
        message.member = await message.guild.fetchMember(message);
    }  

    if (blacklistedservers[guildID] === true &&
        developers[guildID] !== true) {
        return message.channel.send("This server is blacklisted!");
    }

    return client.emit("command", message, guild_info);
};