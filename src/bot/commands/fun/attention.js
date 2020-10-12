module.exports = {
    name: "attention",
    description: "get the attention of someone",
    category: "fun",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        if (!messageObject.message.mentions.members.first()) {
            return messageObject.message.channel.send("Please also tag someone");
        }

        messageObject.message.channel.send(`${messageObject.message.mentions.members.first()}, <@${messageObject.message.author.id}> wants your attention! https://media.giphy.com/media/gFnhVBgvn3epTNoF6F/giphy.gif`);
    }
}