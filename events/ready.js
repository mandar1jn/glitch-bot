const botconfig = require('../botconfig.json')
var statusnumber = null;
const server = require('../site/server.js')
const client = require("../index.js")
const DBL = require('dblapi.js');
var dbl = new DBL(process.env.TOPAPI, client);

module.exports = async (client, dbl) => {
    client.user.setActivity(
        `${client.guilds.cache.size} servers using my features`,
        { type: 'WATCHING' }
    );
    statusnumber = 0;
    setInterval(() => {
        if (statusnumber === 0) {
            client.user.setActivity('Use gb!help for help', { type: 'WATCHING' });
            statusnumber = 1;
        } else if (statusnumber === 1) {
            client.user.setActivity(
                `${client.guilds.cache.size} servers using my features`,
                { type: 'WATCHING' }
            );
            statusnumber = 0;
        } else {
            console.log('invalid status number');
        }
    }, 60000);
    if (botconfig.dev !== true) {
        dbl.postStats(client.guilds.size, client.shard.ids, client.shard.count);
        setInterval(() => {
            dbl.postStats(client.guilds.size, client.shard.ids, client.shard.count);
        }, 1800000);
    }
}