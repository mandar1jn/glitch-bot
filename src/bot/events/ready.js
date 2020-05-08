var statusnumber = null;
const client = require("../client.js")

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
}