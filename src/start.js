require('dotenv').config();

const path = require("path");
process.env.FONTCONFIG_PATH=path.resolve("src/fonts/");
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(path.resolve('src/bot/client.js'), { token: process.env.TOKEN });
const server = require(path.resolve('src/site/server.js'));

manager.on('message', (shard, message) => {
	console.log(`Shard[${shard.id}] : ${message._eval} : ${message._result}`);
});

server.listen(process.env.PORT || 8080);

manager.spawn();