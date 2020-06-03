const Discord = require("discord.js");

module.exports = {
    name: "giverole",
    description: "give someone a role",
    category: "moderation",
    run: async (client, message, args) => {
        if (message.member.hasPermission("MANAGE_GUILD")) {
            const role = message.guild.roles.find(role => role.name === args[0])

            const user = message.mentions.members.first()

            if (!role) {
                message.channel.send(`That role does not exist please use !giverole <role>  <user>`)
            }
            else if (!user) {
                message.channel.send(`That user does not exist please use !giverole <role> <user>`)
            }
            else {
                user.addRole(role.id).then(() => {
                    message.channel.send("succesfully gave " + user + " the role " + role.name)
                })
            }
        }
        else message.channel.send(new Discord.MessageEmbed().setColor("AA0000").setDescription("You do not have the permission to do that"));
    }
}
