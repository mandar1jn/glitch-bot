const Discord = require("discord.js");
var mentionedUser = null;

module.exports = {
	name: "defaultavatar",
	description: "looks at someones default avatar",
	category: "fun",
	run: async (client, messageObject) => {
		if (!messageObject.message.mentions.members.first()) {
			const avatarEmbedSelf = new Discord.MessageEmbed()
				.setTitle("Default avatar of: " + messageObject.message.author.tag)
				.setColor("ffd000")
				.setImage(messageObject.message.author.defaultAvatarURL);
			return messageObject.message.channel.send(avatarEmbedSelf);
		}
		mentionedUser = messageObject.message.mentions.members.first().user;
		const avatarEmbed = new Discord.MessageEmbed()
			.setTitle("Default avatar of: " + mentionedUser.tag)
			.setColor("ffd000")
			.setImage(mentionedUser.defaultAvatarURL)
			.setFooter(`Requested by: ${messageObject.message.author.tag}`);
		return messageObject.message.channel.send(avatarEmbed);
	}
};
