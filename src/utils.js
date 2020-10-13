//requires fs to be able to read and acces files
const fs = require("fs");
//requires path to easily find the path in the project
const path = require("path");

const defaultguildinfo = require(path.resolve("src/bot/databases/defaultguildinfo.json"));


module.exports.validateDataFolders = async () => {
    //validates the guild info database folder
        if (!fs.existsSync(path.resolve("src/bot/databases/guild info/"))) {
            fs.mkdirSync(path.resolve("src/bot/databases/guild info/"), true, function(e) {
                if (e) {
                    console.log("something went wrong while creating a directory: " + e);
                }
            });
        }
        console.log("guild info has been validated.");

        //validates the xp database folder
        if (!fs.existsSync(path.resolve("src/bot/databases/xp/"))) {
            fs.mkdirSync(path.resolve("src/bot/databases/xp/"), true, function(e) {
                if (e) {
                    console.log("something went wrong while creating a directory: " + e);
                }
            });
        }
        console.log("xp has been validated.");

        //validates the coins database folder
        if (!fs.existsSync(path.resolve("src/bot/databases/coins/"))) {
            fs.mkdirSync(path.resolve("src/bot/databases/coins/"), true, function(e) {
                if (e) {
                    console.log("something went wrong while creating a directory: " + e);
                }
            });
        }
        console.log("coins has been validated.");
};

module.exports.validateGuildData = async (guildID, guild_info) => {
    if (fs.existsSync(path.resolve(`src/bot/databases/guild info/${guildID}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/guild info/${guildID}.json`),
            JSON.stringify(defaultguildinfo), function(err) {
                if (err) {
                    console.log("error", err);
                }
            });
    }

    if (fs.existsSync(path.resolve(`src/bot/databases/xp/xp-${guildID}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/xp/xp-${guildID}.json`),
            "{}", function(err) {
                if (err) {
                    console.log("error", err);
                }
            });
    }

    if (fs.existsSync(path.resolve(`src/bot/databases/coins/coins-${guildID}.json`)) != true) {
        fs.writeFileSync(
            path.resolve(`src/bot/databases/coins/coins-${guildID}.json`),
            "{}", function(err) {
                if (err) {
                    console.log("error", err);
                }
            });
    }

    if (guild_info.prefix == null) {
        guild_info = {
            prefix: process.env.PREFIX
        };
    }

    fs.writeFile(
        path.resolve(`src/bot/databases/guild info/${guildID}.json`),
        JSON.stringify(guild_info), function(err) {
            if (err) {
                console.log("error", err);
            }
        });
};