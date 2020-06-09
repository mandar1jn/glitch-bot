const Discord = require('discord.js');
const path = require("path");
const permissions = require(path.resolve("src/bot/utils/permissions.js"));

module.exports = {
    name: "ban",
    description: "hit someone with the ban hammer",
    category: "moderation",
    run: async (client, message) => {

        if(!permissions(message.member, "BAN_MEMBERS")) return message.channel.send("You don't have the ``BAN_MEMBERS`` permission.")

        if (message.member.hasPermission("MANAGE_GUILD")){
            if (message.mentions.members.first().bannable) {
                message.mentions.members.first().ban(0);
                message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${message.mentions.members.first().user.tag} has been banned.`).setFooter(`By: ${message.author.tag}`));
            } else {
                message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${message.mentions.members.first().user.tag} can not be banned`).setFooter(`By: ${message.author.tag}`));
            }
        }
        else message.channel.send("Sorry, but you don't have the permission to do that.")
    }
}