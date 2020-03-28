const { RichEmbed } = require("discord.js");
const randomPuppy = require("random-puppy");

module.exports = {
    name: "meme",
    description: "sends a random meme",
    category: "fun",
    run: async (client, message, args) => {

        if(!message.channel.nsfw) return message.channel.send("You have to use this command in an nsfw channel")

        const subReddits = ["meme", "me_irl", "crappydesign", "technicallythetruth"];
        const random = subReddits[Math.floor(Math.random() * subReddits.length)];

        const img = await randomPuppy(random);
        const embed = new RichEmbed()
            .setColor("RANDOM")
            .setImage(img)
            .setTitle(`From /r/${random}`)
            .setURL(`https://reddit.com/r/${random}`)
            .setFooter(`Requested by: ${message.author.tag}`);

        message.channel.send(embed);
    }
}
