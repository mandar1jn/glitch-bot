const Discord = require('discord.js')

module.exports = {
    name: "invite",
    description: "creates an invite for this server",
    category: "general",
    run: async (client, message, args) => {
        let invite = await message.channel.createInvite({ maxAge: args[0] * 60 * 1000, maxUses: args[1] }, `Requested by: ${message.author.tag}`);
        message.channel.send(new Discord.MessageEmbed().setColor("ffd000").setDescription("Invite link: " + invite).setFooter(`Requested by: ${message.author.tag}`));
    }
}
