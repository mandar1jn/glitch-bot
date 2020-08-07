module.exports = {
    name: "hello",
    description: "Sends the message Hello!",
    category: "fun",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        message.channel.send("Hello!")
    }
}