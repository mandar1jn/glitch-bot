const fs = require("fs");
const path = require("path");

module.exports = {
    name: "setprefix",
    description: "Set the prefix for the bot",
    category: "moderation",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        const guild_info = require(path.resolve(`src/bot/databases/guild info/${messageObject.message.guild.id}.json`));

        if (!messageObject.message.member.hasPermission("MANAGE_GUILD")) {
            return messageObject.message.channel.send("Sorry, but you don't have the permission to do that");
        }

        if (!messageObject.args[0]) {
            return messageObject.message.channel.send("Please also specifie a prefix");
        }

        guild_info.prefix = messageObject.args[0];

        fs.writeFile(path.resolve(`src/bot/databases/guild info/${messageObject.message.guild.id}.json`), JSON.stringify(guild_info), function(err) {
            if (err) {
                console.log("error", err);
            }
        });

        return messageObject.message.channel.send(`I have changed the prefix to \`\`${messageObject.args[0]}\`\``);

    }
}
