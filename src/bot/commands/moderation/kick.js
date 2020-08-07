const Discord = require('discord.js');

module.exports = {
    name: "kick",
    description: "hit someone with your feet",
    category: "moderation",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("You don't have the ``KICK_MEMBERS`` permission.");
        }
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("I don't have the ``KICK_MEMBERS`` permission.");
        }

        if (!message.mentions.members.first()) {
                return message.channel.send("Please also specify a user to kick");
        }

        if (message.mentions.members.first().kickable) {
            message.mentions.members.first().kick(0);
            message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${message.mentions.members.first().user.tag} has been kicked.`).setFooter(`By: ${message.author.tag}`));
        } else {
            message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${message.mentions.members.first().user.tag} can not be kicked`).setFooter(`By: ${message.author.tag}`));
        }
    }
}