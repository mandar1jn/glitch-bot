const fs = require('fs')

module.exports = async (client, guild) => {
    fs.writeFile(`../databases/guild info/${guild.id}.json`, "{}")
    fs.writeFile(`../databases/munten/${guild.id}.json`, "{}")
    fs.writeFile(`../databases/xp/${guild.id}.json`, "{}")
}