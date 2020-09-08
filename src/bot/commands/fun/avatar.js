const Discord = require('discord.js');
var mentionedUser = null;

module.exports = {
	name: 'avatar',
	description: 'looks at someones avatar',
	category: 'fun',
	run: async (client, messageObject) => {
		if (!messageObject.message.guild.me.hasPermission('SEND_MESSAGES')) {
			return;
		}
		if (!messageObject.message.mentions.members.first()) {
			const avatarEmbed = new Discord.MessageEmbed()
				.setTitle('Avatar of: ' + messageObject.message.author.tag)
				.setColor('ffd000')
				.setImage(
					messageObject.message.author.displayAvatarURL({ dynamic: true, format: 'png' })
				);
			return messageObject.message.channel.send(avatarEmbed);
		}
		mentionedUser = messageObject.message.mentions.members.first().user;
		const avatarEmbed = new Discord.MessageEmbed()
			.setTitle('Avatar of: ' + mentionedUser.tag)
			.setColor('ffd000')
			.setImage(
				mentionedUser.displayAvatarURL({ dynamic: true, format: 'png' })
			)
			.setFooter(`Requested by: ${messageObject.message.author.tag}`);
		return messageObject.message.channel.send(avatarEmbed);
	}
};
