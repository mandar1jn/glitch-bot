module.exports = {
    name: 'site',
    description: 'Sends a link to our official website',
    category: 'general',
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        message.channel.send(
            'Do you want to visit our official website? Go to https://glitch-bot--marijnkneppers.repl.co'
        );
    }
};
