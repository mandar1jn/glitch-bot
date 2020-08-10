require('dotenv').config();

const path = require("path");
process.env.FONTCONFIG_PATH=path.resolve("src/fonts/");
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(path.resolve('src/bot/client.js'), { token: process.env.TOKEN });
const server = require(path.resolve('src/site/server.js'));
const fs = require("fs")

manager.on('message', (manager, shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

fs.readdir(path.resolve('src/bot/manager-events/'), (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const event = require(path.resolve(`src/bot/manager-events/${file}`));
        let eventName = file.split('.')[0];
        manager.on(eventName, event.bind(null, manager));
        delete require.cache[require.resolve(path.resolve(`src/bot/manager-events/${file}`))];
    });
});

server.listen(process.env.PORT || 8080);

manager.spawn();