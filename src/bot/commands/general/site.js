module.exports = {
    name: "site",
    description: "Sends a link to our official website",
    category: "general",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        messageObject.message.channel.send(
            "Do you want to visit our official website? Go to https://glitch-bot--marijnkneppers.repl.co"
        );
    }
};
