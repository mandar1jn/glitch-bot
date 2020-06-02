const fs = require('fs');
const path = require("path");

module.exports = async (client, guild) => {
    fs.writeFile(path.resolve(`src/bot/databases/guild info/${guild.id}.json`, "{}"));
    fs.writeFile(path.resolve(`src/bot/databases/munten/${guild.id}.json`, "{}"));
    fs.writeFile(path.resolve(`src/bot/databases/xp/${guild.id}.json`, "{}"));
}