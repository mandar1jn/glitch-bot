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
        let coins = require(path.resolve(`src/bot/databases/coins/coins-${message.guild.id}.json`));
        if (!coins[message.author.id]) {
            if (!coins[message.author.id]) {
                coins[message.author.id] = {
                    coins: 0,
                    volgende_munt: 5
                };
            }
        }

        let coinsEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor("ffd000")
            .addField("Coins", coins[message.author.id].coins, true)
            .setFooter(`You still have to send ${coins[message.author.id].volgende_munt} more message(s) to get your next coin`, message.author.displayAvatarURL);

        message.channel.send(coinsEmbed)
    }
}
