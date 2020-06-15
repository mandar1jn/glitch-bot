const Discord = require('discord.js')
const path = require("path");
const permissions = require(path.resolve("src/bot/utils/permissions.js"));

module.exports = {
    name: "kick",
    description: "hit someone with your feet",
    category: "moderation",
    run: async (client, message) => {
        if (!permissions.checkClientPermission(message.member, "KICK_MEMBERS")) {
            if (permissions.checkClientPermission(message.guild.me, "SEND_MESSAGES")) {
                return message.channel.send("You don't have the ``KICK_MEMBERS`` permission.");
            }
        }
        if (!permissions.checkUserPermission(message.member, "KICK_MEMBERS")) {
            if (permissions.checkClientPermission(message.guild.me, "SEND_MESSAGES")) {
                return message.channel.send("I don't have the ``KICK_MEMBERS`` permission.");
            }
        }

        if (!message.mentions.members.first()) {
            if (permissions.checkClientPermission(message.guild.me, "SEND_MESSAGES")) {
                return message.channel.send("Please also specify a user to kick");
            }
        }

        if (message.mentions.members.first().kickable) {
            message.mentions.members.first().kick(0);
            if (!message.mentions.members.first()) {
                if (!permissions.checkClientPermission(message.guild.me, "SEND_MESSAGES")) {
                    return;
                }
            }
            message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${message.mentions.members.first().user.tag} has been kicked.`).setFooter(`By: ${message.author.tag}`));
        } else {
            if (!permissions.checkClientPermission(message.guild.me, "SEND_MESSAGES")) {
                return;
            }
            message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${message.mentions.members.first().user.tag} can not be kicked`).setFooter(`By: ${message.author.tag}`));
        }
    }
}