const Discord = require('discord.js')

module.exports = {
    name: "serverinfo",
    description: "shows information about the server",
    category: "general",
    run: async (client, message) => {
        let serverIcon = message.guild.iconURL;
        let serverembed = new Discord.MessageEmbed()
            .setDescription("Server info")
            .setColor("ffd000")
            .setThumbnail(serverIcon)
            .addField("Server name", message.guild.name)
            .addField("Created at", message.guild.createdAt)
            .addField("Joined at", message.member.joinedAt)
            .addField("Number of people", message.guild.memberCount);

        message.channel.send(serverembed);
    }
}