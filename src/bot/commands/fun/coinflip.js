module.exports = {
    name: 'coinflip',
    description: 'Flip a coin, tell if it is heads or tails',
    category: "fun",
    run(client, messageObject) {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        let random = (Math.floor(Math.random() * Math.floor(2)));

        if(random === 0) {
          return messageObjectmessage.channel.send('I flipped heads!');
        }
        else {
          return messageObject.message.channel.send('I flipped tails!');
        }
    },
};