const Discord = require('discord.js')
const path = require('path');

module.exports = {
    name: "clear",
    description: "delete messages",
    category: "moderation",
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription("You do not have the permission to do that"));
        }

        if (!args[0]) return message.channel.send("Please enter an integer")

        if (Number.isInteger(parseInt(args[0]))) {
            var amount = parseInt(args[0]) + 1;

            if (amount > 100) return message.channel.send("You can not remove more than 99 messages")

            if (args[0] <= 0) {
                message.channel.send("I can't delete 0 messages")
            }

            message.channel.bulkDelete(amount).then(() => {
                message.channel.send(`I have removed ${amount - 1} messages`).then(message => message.delete(3000));
            });
        }
        else {
            return message.channel.send("Please enter an integer")
        }
    }
}