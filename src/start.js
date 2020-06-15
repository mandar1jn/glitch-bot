require('dotenv').config();
const path = require("path");

const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(path.resolve('src/bot/client.js'), { token: process.env.TOKEN });
const server = require(path.resolve('src/site/server.js'));
server.listen(process.env.PORT || 8080);

manager.spawn();