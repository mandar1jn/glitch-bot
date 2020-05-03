const Discord = require("discord.js");

module.exports = {
    name: "coins",
    description: "shows your coins",
    category: "general",
    run: async (client, message, args)=> {
        let munten = require(`../../databases/munten/munten-${message.guild.id}.json`);
        if (!munten[message.author.id]) {
            if (!munten[message.author.id]) {
                munten[message.author.id] = {
                    munten: 0,
                    volgende_munt: 5
                };
            }
        }

        let muntenEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor("ffd000")
            .addField("Munten", munten[message.author.id].munten, true)
            .setFooter(`Je moet nog ${munten[message.author.id].volgende_munt} berichten versturen voor je volgende munt`, message.author.displayAvatarURL);

        message.channel.send(muntenEmbed)
    }
}
