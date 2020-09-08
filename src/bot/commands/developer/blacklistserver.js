const path = require("path");
const developers = require(path.resolve("src/bot/databases/developers.json"));
const blacklistedservers = require(path.resolve("src/bot/databases/blacklistedservers.json"));
const fs = require("fs");

module.exports = {
    name: "blacklistserver",
    description: "blacklists a server",
    category: "developer",
    run: async (client, messageObject) => {
        if (!developers[messageObject.message.author.id] == true && !developers[messageObject.message.author.id]) {
            return messageObject.message.channel.send("You are not a developer of this bot");
        }

        if (!messageObject.args[0]) return messageObject.message.channel.send("Please also specify a id for the guild that you want to blacklist");

        blacklistedservers[args[0]] = true;

        fs.writeFile(path.resolve(`src/bot/databases/blacklistedservers.json`), JSON.stringify(blacklistedservers));
        
        return messageObject.message.channel.send("I have blacklisted the server")
    }
}
