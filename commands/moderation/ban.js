const Discord = require('discord.js')
const errors = require("../../utils/errors.js")

module.exports = {
    name: "ban",
    description: "hit someone with the ban hammer",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.hasPermission("MANAGE_GUILD")){
            if (message.mentions.members.first().bannable) {
                message.mentions.members.first().ban(0);
                message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription(`${message.mentions.members.first().user.tag} has been banned.`).setFooter(`By: ${message.author.tag}`));
            } else {
                message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription(`${message.mentions.members.first().user.tag} can not be banned`).setFooter(`By: ${message.author.tag}`));
            }
        }
        else errors.nopermission(client, message,args);
    }
}