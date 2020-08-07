const Discord = require('discord.js')
var mentionedUser = null;

module.exports = {
    name: "avatar",
    description: "looks at someones avatar",
    category: "fun",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        if (!message.mentions.members.first()) {
            const avatarEmbed = new Discord.MessageEmbed()
                .setTitle('Avatar of: ' + message.author.tag)
                .setColor("ffd000")
                .setImage(message.author.displayAvatarURL({dynamic:true, format:"png"}));
            return message.channel.send(avatarEmbed);
        }
        else {
            mentionedUser = message.mentions.members.first().user;
            const avatarEmbed = new Discord.MessageEmbed()
                .setTitle('Avatar of: ' + mentionedUser.tag)
                .setColor("ffd000")
                .setImage(mentionedUser.displayAvatarURL({dynamic:true,format:"png"}))
                .setFooter(`Requested by: ${message.author.tag}`);
            return message.channel.send(avatarEmbed);
        }
    }
}