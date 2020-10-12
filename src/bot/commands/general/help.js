const Discord = require("discord.js");

module.exports = {
    name: "help",
    description: "Sends this help message",
    category: "general",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        const guild_info = require(`../../databases/guild info/${messageObject.message.guild.id}.json`);

        var commandList = [];

        if (!messageObject.args[0]) {
            return messageObject.message.channel.send(`Use **${guild_info.prefix}help <1|2|3|4>**`)
        }

        client.commands.forEach((command) => {

            let item = {

                name: command.name,
                description: command.description,
                category: command.category

            };

            switch(item.category){
                case "general":
                    if(messageObject.args[0] === "1"){
                        commandList.push(item);
                    }
                    break;
                case "fun":
                    if(messageObject.args[0] === "2"){
                        commandList.push(item);
                    }
                    break;
                case "moderation":
                    if(messageObject.args[0] === "3"){
                        commandList.push(item);
                    }
                    break;
                case "misc":
                    if(messageObject.args[0] === "4"){
                        commandList.push(item);
                    }
                    break;
            }
        });

        let prefix = guild_info.prefix;
        let response = new Discord.MessageEmbed().setColor("ffd000");

        switch(messageObject.args[0]){
            case "1":
                response.setTitle("general");
                break;
            case "2":
                response.setTitle("fun");
                break;
            case "3":
                response.setTitle("admin");
                break;
            case "4":
                response.setTitle("misc");
        }

        for (var i = 0; i < commandList.length; i++) {

            response.addField(`${prefix}${commandList[i]["name"]}`, `${commandList[i]["description"]}`)

        }

        return messageObject.message.channel.send(response);
    }
}