//requires fs to be able to read and acces files
const fs = require('fs');
//requires path to easily find the path in the project
const path = require('path');

const utils = new class{
    validateDataFolders = function(){
        //validates the guild info database folder
        if(!fs.existsSync(path.resolve("src/bot/databases/guild info/"))){
            fs.mkdirSync(path.resolve("src/bot/databases/guild info/"), true, function(e){
                if(e){
                    console.log("something went wrong while creating a directory: " + e);
                }
                else{
                    console.log("guild info has been created.")
                }
            })
        }
        else{
            console.log("guild info has been validated.")
        }

        //validates the xp database folder
        if(!fs.existsSync(path.resolve("src/bot/databases/xp/"))){
            fs.mkdirSync(path.resolve("src/bot/databases/xp/"), true, function(e){
                if(e){
                    console.log("something went wrong while creating a directory: " + e);
                }
                else{
                    console.log("xp has been created.")
                }
            })
        }
        else{
            console.log("xp has been validated.")
        }

        //validates the coins database folder
        if(!fs.existsSync(path.resolve("src/bot/databases/coins/"))){
            fs.mkdirSync(path.resolve("src/bot/databases/coins/"), true, function(e){
                if(e){
                    console.log("something went wrong while creating a directory: " + e);
                }
                else{
                    console.log("coins has been created.")
                }
            })
        }
        else{
            console.log("coins has been validated.")
        }
    }
}

module.exports = utils;