const path = require("path");
const developers = require(path.resolve("src/bot/databases/developers.json"));
const blacklistedservers = require(path.resolve("src/bot/databases/blacklistedservers.json"));
const fs = require("fs");

module.exports = {
    name: "unblacklistserver",
    description: "unblacklists a server",
    category: "developer",
    run: async (client, message, args) => {
        if(!developers[message.author.id] == true && !developers[message.author.id]){
            return message.channel.send("You are not a developer of this bot");
        }

        if(!args[0]) return message.channel.send("Please also specify a id for the guild that you want to blacklist");

        blacklistedservers[args[0]] = false;

        fs.writeFile(path.resolve(`src/bot/databases/blacklistedservers.json`), JSON.stringify(blacklistedservers), (err) => {
        if (err) console.log(err);
    });
    message.channel.send("I have unblacklisted the server")
    }
}