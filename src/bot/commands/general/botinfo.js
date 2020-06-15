const Discord = require("discord.js")

module.exports = {
    name: "botinfo",
    description: "Shows info about this bot",
    category: "general",
    run: async (client, message, args, permissions) => {
        var usedRAM = Math.round((process.memoryUsage().heapUsed / 1024 / 1024) * 100) / 100;
        var maxRAM = Math.round((process.memoryUsage().heapTotal / 1024 / 1024) * 100) / 100;
        const infoEmbed = new Discord.MessageEmbed()
            .setTitle("Bot info")
            .addField("Used RAM", `${usedRAM} MB`)
            .addField("Max RAM", `${maxRAM} MB`)

        if(!permissions.clientPermissions.send_message) return;
        message.channel.send(infoEmbed);
    } 
}