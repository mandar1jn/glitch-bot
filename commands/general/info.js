const Discord = require('discord.js')

module.exports = {
    name: "info",
    description: "shows info about your account",
    category: "general",
    run: async (client, message, args) => {
        infoEmbed = new Discord.RichEmbed()
            .setTitle(`Profile of: ${message.author.tag}`)
            .addField("Tag", message.author.tag)
            .addField("Username", message.author.username)
            .addField("Status", message.author.presence.status)
            .addField("Created at", message.author.createdAt)
        message.channel.send(infoEmbed);
    }
}
