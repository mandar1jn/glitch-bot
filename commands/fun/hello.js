module.exports = {
    name: "hello",
    description: "Sends the message Hello!",
    category: "fun",
    run: async (client, message, args) => {
        message.channel.send("Hello!")
    }
}