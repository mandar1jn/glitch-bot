module.exports = {
    name: "attention",
    description: "get the attention of someone",
    category: "fun",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        if (!message.mentions.members.first()) return message.channel.send("Please also tag someone");

        message.channel.send(`${message.mentions.members.first()}, <@${message.author.id}> wants your attention! https://media.giphy.com/media/gFnhVBgvn3epTNoF6F/giphy.gif`).then(message.delete())
    }
}