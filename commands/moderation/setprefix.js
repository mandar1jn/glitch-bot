const fs = require("fs")
const errors = require("../../utils/errors.js")

module.exports = {
    name: "setprefix",
    description: "Set the prefix for the bot",
    category: "moderation",
    run: async (client, message, args) => {

        const guild_info = require(`../../databases/guild info/${message.guild.id}.json`);

        if (!message.member.hasPermission("MANAGE_GUILD")) return errors.nopermission(client, message, args);

        if(!args[0]) return message.channel.send("Please also specifie a prefix");

        guild_info.prefix = args[0];

       fs.writeFile(`./databases/guild info/${message.guild.id}.json`, JSON.stringify(guild_info), (err) => {
        if (err) console.log(err);
    });

    message.channel.send(`I have changed the prefix to ${args[0]}`)

    }
}
