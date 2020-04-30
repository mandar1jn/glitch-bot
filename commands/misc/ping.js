const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    category: "misc",
    run: async (client, message, args) => {
        const msg = await message.channel.send(`🏓 Pinging....`);

        const pingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle(`🏓 Pong!`)
            .addField("Latency", `${Math.floor(msg.createdTimestamp - message.createdTimestamp)}ms`)

        message.channel.send(pingEmbed);

        msg.delete();
    }
}