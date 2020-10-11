var statusnumber = null;
var shardid = null;

module.exports = async (client) => {
    shardid = parseInt(client.shard.ids) + 1;
    client.user.setActivity("Use gb!help for help", { type: "WATCHING" });
    statusnumber = 0;
    setInterval(() => {
        if (statusnumber === 0) {
            client.user.setActivity("people use gb!help for help", { type: "WATCHING" });
            statusnumber = 1;
        } else if (statusnumber === 1) {
            client.user.setActivity(
                `${client.guilds.cache.size} servers using my features`,
                { type: "WATCHING" }
            );
            statusnumber = 2;
        }
        else if (statusnumber === 2){
            client.user.setActivity(`running on shard ${shardid} of the ${client.shard.count}`, {type: `PLAYING`});
            statusnumber = 0;
        }
    }, 60000);
}