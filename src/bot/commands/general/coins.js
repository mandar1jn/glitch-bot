const Discord = require("discord.js");
const path = require("path")

module.exports = {
    name: "coins",
    description: "shows your coins",
    category: "general",
    run: async (client, message)=> {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        let munten = require(path.resolve(`src/bot/databases/munten/munten-${message.guild.id}.json`));
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
            .addField("Coins", munten[message.author.id].munten, true)
            .setFooter(`You still have to send ${munten[message.author.id].volgende_munt} more message(s) to get your next coin`, message.author.displayAvatarURL);

        message.channel.send(muntenEmbed)
    }
}
