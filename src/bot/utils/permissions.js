var userPermissions = null;
var clientPermissions = null;

module.exports = {
    getPermissions: async (member, client) => {
        permissions = {
            userPermissions: getUserPermission(member),
            clientPermissions: getClientPermission(client)
        }

        return permissions;
    }
}

async function getUserPermission(member) {

    userPermissions: {
        create_instant_invite: member.hasPermission("CREATE_INSTANT_INVITE"),
        kick_members = member.hasPermission("KICK_MEMBERS"),
        ban_members = member.hasPermission("BAN_MEMBERS"),
        administrator = member.hasPermission("ADMINISTRATOR"),
        manage_channels = member.hasPermission("MANAGE_CHANNELS"),
        manage_guild = member.hasPermission("MANAGE_GUILD"),
        add_reactions = member.hasPermission("ADD_REACTIONS"),
        view_audit_log = member.hasPermission("VIEW_AUDIT_LOG"),
        priority_speaker = member.hasPermission("PRIORITY_SPEAKER"),
        stream = member.hasPermission("STREAM"),
        view_channel = member.hasPermission("VIEW_CHANNEL"),
        send_messages = member.hasPermission("SEND_MESSAGES")
    }

    return userPermissions;
}

async function getClientPermission(member) {


    return clientPermissions;
}