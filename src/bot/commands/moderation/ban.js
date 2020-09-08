const Discord = require('discord.js');

module.exports = {
    name: "ban",
    description: "hit someone with the ban hammer",
    category: "moderation",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if (!messageObject.message.member.hasPermission("BAN_MEMBERS")) {
            return messageObject.message.channel.send("You don't have the ``BAN_MEMBERS`` permission.");
        }
        if (!messageObject.message.guild.me.hasPermission("BAN_MEMBERS")) {
                return messageObject.message.channel.send("I don't have the ``BAN_MEMBERS`` permission.");
        }

        if(!messageObject.message.mentions.members.first()){
            return messageObject.message.channel.send("Please also specify a user to ban");
        }

        if (messageObject.message.mentions.members.first().bannable) {
            messageObject.message.mentions.members.first().ban(0);
            messageObject.message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${messageObject.message.mentions.members.first().user.tag} has been banned.`).setFooter(`By: ${messageObject.message.author.tag}`));
        } else {
            messageObject.message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${messageObject.message.mentions.members.first().user.tag} can not be banned`).setFooter(`By: ${messageObject.message.author.tag}`));
        }
    }
}