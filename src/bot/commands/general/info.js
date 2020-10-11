const Discord = require("discord.js");

module.exports = {
    name: "info",
    description: "user information",
    category: "general",
    run(client, messageObject) {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        const member = messageObject.message.mentions.members.first() || messageObject.message.member;
        const user = messageObject.message.author;

        const embed = new Discord.MessageEmbed()
            .setTitle(`${user.username}`)
            .setColor("RANDOM")
            .setThumbnail(user.displayAvatarURL)
            .addField("Username", user.username, true)
            .addField("Nickname", member.username, true)
            .addField("ID", user.id, true)
            .addField("Account Created", user.createdAt.toDateString(), true)
            .addField("Joined Server", member.joinedAt.toDateString(), true)
            .setFooter("User Info", user.displayAvatarURL);

        return messageObject.message.channel.send(embed);
    },
};