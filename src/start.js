//sets dotenv up
require('dotenv').config();

//requires path because it is needed to require other files in the project
const path = require("path");

//requires fs to be able to read and edit files
const fs = require("fs")

//requires the utils file to acces all utility functions
const utils = require(path.resolve('src/utils.js'));

//starts the bot

//requires the sharmanager from the discord api.
const { ShardingManager } = require('discord.js');

//creates a manager object with a path to the bot file and the token from the .env file
const manager = new ShardingManager(path.resolve('src/bot/client.js'), { token: process.env.TOKEN });

//reads the files drom the events folder and links them to the corrensponding events
fs.readdir(path.resolve('src/bot/events/manager/'), (err, files) => {
    files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const event = require(path.resolve(`src/bot/events/manager/${file}`));
        let eventName = file.split('.')[0];
        manager.on(eventName, event.bind(null, manager));
        delete require.cache[require.resolve(path.resolve(`src/bot/events/manager/${file}`))];
    });
});

//waits for all folders to be validated
utils.validateDataFolders();

//starts the manager
manager.spawn();

//starts the website

//requires the server file
//const server = require(path.resolve('src/site/server.js'));

//starts the server
//server.listen(process.env.PORT || 8080);