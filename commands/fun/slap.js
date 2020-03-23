module.exports = {
    name: "slap",
    description: "slap someone",
    category: "fun",
    run: async (client, message, args) => {

        const slapImages = ["https://media.giphy.com/media/IYcXTDme1ZPMI/giphy.gif"];
        const randomImage = slapImages[Math.floor(Math.random() * slapImages.length)];
        message.reply(`slapped <@${message.mentions.members.first().id}> ${randomImage}`);
    }
}