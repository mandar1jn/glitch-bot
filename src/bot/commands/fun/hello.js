module.exports = {
    name: "hello",
    description: "Sends the message Hello!",
    category: "fun",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        return messageObject.message.channel.send("Hello!")
    }
}