const Discord = require('discord.js');

module.exports = {
    name: "help",
    description: "Sends this help message",
    category: "general",
    run: async (client, message, args) => {

        const guild_info = require(`../../databases/guild info/${message.guild.id}.json`);

        var commandList = [];

        if (!args[0]) return message.channel.send(`Use **${guild_info.prefix}help <1|2|3|4>**`)

        client.commands.forEach(command => {

            var item = {

                name: command.name,
                description: command.description,
                category: command.category

            };

            if (item.category === "general" && args[0] === "1") {
                commandList.push(item);
            }

            else if (item.category === "fun" && args[0] === "2") {
                commandList.push(item);
            }

            else if (item.category === "moderation" && args[0] === "3") {
                commandList.push(item);
            }

            else if (item.category === "misc" && args[0] === "4") {
                commandList.push(item);
            }

        });

        var prefix = ".";
        var response = new Discord.MessageEmbed().setColor("ffd000")

        if (args[0] === "1") {
            response.setTitle("general")
        }

        else if (args[0] === "2") {
            response.setTitle("fun")
        }

        else if (args[0] === "3") {
            response.setTitle("admin")
        }

        else if (args[0] === "4") {
            response.setTitle("misc")
        }
        else {
            return message.channel.send("Please use help <1|2|3|4>")
        }

        for (var i = 0; i < commandList.length; i++) {

            response.addField(`${prefix}${commandList[i]["name"]}`, `${commandList[i]["description"]}`)

        }

        message.channel.send(response)
    }
}