const Discord = require("discord.js");

module.exports = {
    name: "ping",
    description: "Returns latency and API ping",
    category: "misc",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        const msg = await messageObject.message.channel.send("🏓 Pinging....");

        const pingEmbed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setTitle("🏓 Pong!")
            .addField("Latency", `${Math.floor(msg.createdTimestamp - messageObject.message.createdTimestamp)}ms`);

        messageObject.message.channel.send(pingEmbed);

        return msg.delete();
    }
};