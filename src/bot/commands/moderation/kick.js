const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "hit someone with your feet",
    category: "moderation",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if (!messageObject.message.member.hasPermission("KICK_MEMBERS")) {
            return messageObject.message.channel.send("You don't have the ``KICK_MEMBERS`` permission.");
        }
        if (!messageObject.message.member.hasPermission("KICK_MEMBERS")) {
            return messageObject.message.channel.send("I don't have the ``KICK_MEMBERS`` permission.");
        }

        if (!messageObject.message.mentions.members.first()) {
                return messageObject.message.channel.send("Please also specify a user to kick");
        }

        if (messageObject.message.mentions.members.first().kickable) {
            messageObject.message.mentions.members.first().kick(0);
            messageObject.message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${messageObject.message.mentions.members.first().user.tag} has been kicked.`).setFooter(`By: ${messageObject.message.author.tag}`));
        } else {
            messageObject.message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${messageObject/message.mentions.members.first().user.tag} can not be kicked`).setFooter(`By: ${messageObject.message.author.tag}`));
        }
    }
}