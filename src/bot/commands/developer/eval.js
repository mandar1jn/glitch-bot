const path = require("path")
const developers = require(path.resolve('src/bot/databases/developers.json'));

module.exports = {
    name: 'eval',
    description: 'evaluate some code',
    category: 'developer',
    run: async (client, messageObject) => {
        if (
            !developers[messageObject.message.author.id] === true &&
            !developers[messageObject.message.author.id]
        ) {
            return messageObject.message.channel.send('You are not a developer of this bot');
        }

        var command = args.join(' ');
        messageObject.message.channel.send(eval(command))
    }
};
