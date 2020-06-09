module.exports = {
    checkUserPermission: async (member, permission) => {
        //use like checkUserPermission(message.member, "MODERATOR")
        return member.hasPermission(permission);
    },
    checkUserPermission: async (client, permission) => {
        //use like checkUserPermission(message.guild.me, "MODERATOR")
        return client.hasPermission(permission);
    }
}