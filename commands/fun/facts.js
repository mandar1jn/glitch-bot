const Discord = require('discord.js')

module.exports = {
    name: "facts",
    description: "shows some facts",
    category: "fun",
    run: async (client, message, args) => {
        infoEmbed = new Discord.RichEmbed()
            .setTitle("5 facts")
            .setThumbnail(client.user.displayAvatarURL)
            .setColor("RANDOM")
            .addField("Fact 1", "Every odd number has an E in it")
            .addField("Fact 2", "The man that invented the frisbee was cremated into a frisbee when he died")
            .addField("Fact 3", "It takes 6 months for a nail to grow back if you completely lost it")
            .addField("Fact 4", "On average, 96 million cells die in your body every minute")
            .addField("Fact 5", "Friday the 13th will always occur during any month that begins on a Sunday")
            .setFooter(`Every big update the facts get changed`)
        message.channel.send(infoEmbed);
    }
}
