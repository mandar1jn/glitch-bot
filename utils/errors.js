module.exports = {
    nopermission: async (client, message, args) => {
        message.channel.send("Sorry, but you don't have the permission to do that");
    }
}