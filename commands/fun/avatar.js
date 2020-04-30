const Discord = require('discord.js')

module.exports = {
    name: "avatar",
    description: "looks at someones avatar",
    category: "fun",
    run: async (client, message, args) => {
        if (!message.mentions.members.first()) {
            const avatarEmbed = new Discord.MessageEmbed()
                .setTitle('Avatar of: ' + message.author.tag)
                .setColor("ffd000")
                .setImage(message.author.displayAvatarURL({dynamic:true, format:"png"}));
            message.channel.send(avatarEmbed)
        }
        else {
            mentionedUser = message.mentions.members.first().user;
            const avatarEmbed = new Discord.MessageEmbed()
                .setTitle('Avatar of: ' + mentionedUser.tag)
                .setColor("ffd000")
                .setImage(mentionedUser.displayAvatarURL({dynamic:true,format:"png"}))
                .setFooter(`Requested by: ${message.author.tag}`);
            message.channel.send(avatarEmbed)
        }
    }
}