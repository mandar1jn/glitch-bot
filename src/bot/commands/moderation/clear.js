const Discord = require("discord.js");

module.exports = {
	name: "clear",
	description: "delete messages",
	category: "moderation",
	run: async (client, messageObject) => {
		if (!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")) {
			return;
		}

		if (!messageObject.message.member.hasPermission("MANAGE_MESSAGES")) {
			return messageObject.message.channel.send(
				new Discord.MessageEmbed()
					.setColor("AA0000")
					.setDescription("You do not have the permission to do that")
			);
		}

		if (!messageObject.args[0]) {
            return messageObject.message.channel.send("Please enter an integer");
        }

		if (Number.isInteger(parseInt(messageObject.args[0], 2))) {
			var amount = parseInt(messageObject.args[0], 2) + 1;

			if (amount > 100) {
				return messageObject.message.channel.send("You can not remove more than 99 messages");
            }

			if (messageObject.args[0] <= 0) {
				return messageObject.message.channel.send("I can't delete 0 messages");
			}

			return messageObject.message.channel.bulkDelete(amount).then(() => {
				messageObject.message.channel
					.send(`I have removed ${amount - 1} messages`)
					.then((message) => message.delete({timeout:3000}));
			});
		}
		return messageObject.message.channel.send("Please enter an integer");
	}
};
