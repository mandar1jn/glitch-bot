const path = require("path")
const developers = require(path.resolve('src/bot/databases/developers.json'));

module.exports = {
    name: 'eval',
    description: 'evaluate some code',
    category: 'developer',
    run: async (client, message, args) => {
        if (
            !developers[message.author.id] === true &&
            !developers[message.author.id]
        ) {
            return message.channel.send('You are not a developer of this bot');
        }

        var command = args.join(' ');
        message.channel.send(eval(command))
    }
};
