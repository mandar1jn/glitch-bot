const request = require('request');
const cheerio = require('cheerio');

function searchImage(message, image) {

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + image,
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    }

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
        var $ = cheerio.load(responseBody);

        var links = $(".image a.link");

        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));

        if (!urls.length) {

            return;
        }

        message.channel.send(urls[Math.floor(Math.random() * urls.length)]);
    });
}

module.exports = {
    name: "image",
    description: "shows the image that you searched for",
    category: "fun",
    run: async (client, messageObject) => {
        if(!messageObject.message.guild.me.hasPermission("SEND_MESSAGES")){
            return;
        }
        var image = messageObject.args.join(' ');

        searchImage(messageObject.message, image);
    }
};