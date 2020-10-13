const { MessageEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    description: "sends a random meme",
    category: "fun",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        if(!messageObject.message.channel.nsfw) {
            return messageObject.message.channel.send("You have to use this command in an nsfw channel");
        }

        const subReddits = ["meme", "me_irl", "crappydesign", "technicallythetruth", "ComedyCemetery", "dankmemes", "PrequelMemes", "terriblefacebookmemes", "PewdiepieSubmissions", "funny"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random); 
        if(!img) {
            return messageObject.message.channel.send("Sorry, but the meme that was picked didn't have an image. Please try again");
        }
        const embed = new MessageEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(`Requested by: ${messageObject.message.author.tag}`);

        return messageObject.message.channel.send(embed);
    }
};