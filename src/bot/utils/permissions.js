module.exports = {
    checkUserPermission: async (member, permission) => {
        //use like checkUserPermission(message.member, "MODERATOR")
        return member.hasPermission(permission);
    },
    checkClientPermission: async (client, permission) => {
        //use like checkClientPermission(message.guild.me, "MODERATOR")
        return client.hasPermission(permission);
    }
}