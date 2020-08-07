const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "hit someone with the ban hammer",
    category: "moderation",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.channel.send("You don't have the ``BAN_MEMBERS`` permission.");
        }
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
                return message.channel.send("I don't have the ``BAN_MEMBERS`` permission.");
        }

        if(!message.mentions.members.first()){
            return message.channel.send("Please also specify a user to ban");
        }

        if (message.mentions.members.first().bannable) {
            message.mentions.members.first().ban(0);
            message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${message.mentions.members.first().user.tag} has been banned.`).setFooter(`By: ${message.author.tag}`));
        } else {
            message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${message.mentions.members.first().user.tag} can not be banned`).setFooter(`By: ${message.author.tag}`));
        }
    }
}