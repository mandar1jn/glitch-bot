const Discord = require("discord.js");

module.exports = {
    name: "serverinfo",
    description: "shows information about the server",
    category: "general",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        let serverIcon = messageObject.message.guild.iconURL;
        let serverembed = new Discord.MessageEmbed()
            .setDescription("Server info")
            .setColor("ffd000")
            .setThumbnail(serverIcon)
            .addField("Server name", messageObject.message.guild.name)
            .addField("Created at", messageObject.message.guild.createdAt)
            .addField("Joined at", messageObject.message.member.joinedAt)
            .addField("Number of people", messageObject.message.guild.memberCount);

        return messageObject.message.channel.send(serverembed);
    }
};