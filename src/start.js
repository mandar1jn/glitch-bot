//sets dotenv up
require('dotenv').config();

//requires path because it is needed to require other files in the project
const path = require("path");

//requires the utils file to acces all utility functions
const utils = require(path.resolve('src/utils.js'));

//starts the bot

//requires the sharmanager from the discord api.
const { ShardingManager } = require('discord.js');

//creates a manager object with a path to the bot file and the token from the .env file
const manager = new ShardingManager(path.resolve('src/bot/client.js'), { token: process.env.TOKEN });

//registers manager events
require(path.resolve('src/bot/handlers/events.js')).registerManagerEvents(manager);

//waits for all folders to be validated
utils.validateDataFolders();

//starts the manager
manager.spawn();

//starts the website

//requires the server file
const server = require(path.resolve('src/site/server.js'));

//starts the server
server.listen(process.env.PORT || 8080);