module.exports = {
    name: "rps",
    description: "Play rock-paper-scissor with me",
    category: "fun",
    run: async (client, message, args) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if (!args[0]) return message.channel.send(`Use: .rps <rock|paper|scissor>`);

        var options = ["rock", "paper", "scissor"]

        var result = options[Math.floor(Math.random() * options.length)];

        if (args[0] == "rock") {
            if (result == "paper") {
                message.channel.send(`I have ${result} :notepad_spiral:. I win!`)
            }
            else if (result == "scissor") {
                message.channel.send(`I have ${result} :scissors:. You win!`)
            }
            else if (result == "rock") {
                message.channel.send(`I have ${result} :curling_stone:. It is a tie!`)
            }
        }
        else if (args[0] == "paper") {
            if (result == "paper") {
                message.channel.send(`I have ${result} :notepad_spiral:. It is a tie!`)
            }
            else if (result == "scissor") {
                message.channel.send(`I have ${result} :scissors:. I win!`)
            }
            else if (result == "rock") {
                message.channel.send(`I have ${result} :curling_stone:. You win!`)
            }
        }
        else if (args[0] == "scissor") {
            if (result == "paper") {
                message.channel.send(`I have ${result} :notepad_spiral:. You win!`)
            }
            else if (result == "scissor") {
                message.channel.send(`I have ${result} :scissors:. It is a tie!`)
            }
            else if (result == "rock") {
                message.channel.send(`I have ${result} :curling_stone:. I win!`)
            }
        }
    }
}
