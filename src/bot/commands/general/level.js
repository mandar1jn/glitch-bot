const Discord = require("discord.js");
const path = require("path")

module.exports = {
    name: "level",
    description: "shows your level",
    category: "general",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        let xp = require(path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`));
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 300 * 1.2;
        let difference = nxtLvlXp - curxp;

        let lvlEmbed = new Discord.MessageEmbed()
            .setAuthor(message.author.username)
            .setColor("ffd000")
            .addField("Level", curlvl, true)
            .addField("XP", curxp, true)
            .setFooter(`${difference} XP needed for the next level`, message.author.displayAvatarURL);

        message.channel.send(lvlEmbed);
    }
}
