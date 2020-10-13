const Discord = require("discord.js");
const path = require("path");
const fs = require("fs");
const defaultCoins = {
    coins: 0,
    volgende_munt: 5
};

module.exports = {
    name: "coins",
    description: "shows your coins",
    category: "general",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        let guildID = messageObject.message.guild.id;
        let authorID = messageObject.message.author.id;
        let coins = JSON.parse(fs.readFileSync(path.resolve(`src/bot/databases/coins/coins-${guildID}.json`)));
        if (!coins[authorID]) {
            if (!coins[authorID]) {
                coins[authorID] = defaultCoins;
            }
        }

        let coinsEmbed = new Discord.MessageEmbed()
            .setAuthor(messageObject.message.author.username)
            .setColor("ffd000")
            .addField("Coins", coins[authorID].coins, true)
            .setFooter(`You still have to send ${coins[authorID].volgende_munt} more message(s) to get your next coin`, messageObject.message.author.displayAvatarURL);

        messageObject.message.channel.send(coinsEmbed);
    }
};
