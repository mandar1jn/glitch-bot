module.exports = {
    name: "discord",
    description: "sends an invite to the official glitch bot discord!",
    category: "general",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        message.channel.send("Do you want to report a bug? Or just hangout with the glitch bot community? Then join https://discord.gg/SadnQPb")
    }
}
