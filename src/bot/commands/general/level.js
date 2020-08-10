const Discord = require("discord.js");
const path = require("path");
const canvas = require("canvas");

module.exports = {
    name: "level",
    description: "shows your level",
    category: "general",
    run: async (client, message) => {
        if(!message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }

        let xp = require(path.resolve(`src/bot/databases/xp/xp-${message.guild.id}.json`));
        if (!xp[message.author.id]) {
            xp[message.author.id] = {
                xp: 0,
                level: 1
            };
        }
        let curxp = xp[message.author.id].xp;
        let curlvl = xp[message.author.id].level;
        let nxtLvlXp = curlvl * 300 * 1.2;
        let difference = nxtLvlXp - curxp;

let image = canvas.createCanvas(200, 100)
let ctxAvatar = image.getContext("2d");
let xpCtx = image.getContext("2d");
let xpText = curxp + "/" + nxtLvlXp + " xp to level " + curlvl + 1;
xpCtx.font = '12px "Comic Sans"'
xpCtx.fillText(xpText, 0, 0)
        let attachment = new Discord.MessageAttachment(image.toBuffer());

        message.channel.send(attachment);
    }
}
