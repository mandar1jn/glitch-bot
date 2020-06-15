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
        send_messages = member.hasPermission("SEND_MESSAGES"),
        send_tts_messages = member.hasPermission("SEND_TTS_MESSAGES"),
        manage_messages = member.hasPermission("MANAGE_MESSAGES"),
        embed_links = member.hasPermission("EMBED_LINKS"),
        attach_files = member.hasPermission("ATTACH_FILES"),
        read_message_history = member.hasPermission("READ_MESSAGE_HISTORY"),
        mention_everyone = member.hasPermission("MENTION_EVERYONE"),
        use_external_emojis = member.hasPermission("USE_EXTERNAL_EMOJIS"),
        view_guild_insights = member.hasPermission("VIEW_GUILD_INSIGHTS"),
        connect = member.hasPermission("CONNECT"),
        speak = member.hasPermission("SPEAK"),
        mute_members = member.hasPermission("MUTE_MEMBERS"),
        deafen_members = member.hasPermission("DEAFEN_MEMBERS"),
        move_members = member.hasPermission("MOVE_MEMBERS"),
        use_vad = member.hasPermission("USE_VAD"),
        change_nickname = member.hasPermission("CHANGE_NICKNAME"),
        manage_nicknames = member.hasPermission("MANAGE_NICKNAMES"),
        manage_roles = member.hasPermission("MANAGE_ROLES"),
        manage_webhooks = member.hasPermission("MANAGE_WEBHOOKS"),
        manage_emojis = member.hasPermission("MANAGE_EMOJIS")
    }

    return userPermissions;
}

async function getClientPermission(member) {

    clientPermissions: {
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
        send_messages = member.hasPermission("SEND_MESSAGES"),
        send_tts_messages = member.hasPermission("SEND_TTS_MESSAGES"),
        manage_messages = member.hasPermission("MANAGE_MESSAGES"),
        embed_links = member.hasPermission("EMBED_LINKS"),
        attach_files = member.hasPermission("ATTACH_FILES"),
        read_message_history = member.hasPermission("READ_MESSAGE_HISTORY"),
        mention_everyone = member.hasPermission("MENTION_EVERYONE"),
        use_external_emojis = member.hasPermission("USE_EXTERNAL_EMOJIS"),
        view_guild_insights = member.hasPermission("VIEW_GUILD_INSIGHTS"),
        connect = member.hasPermission("CONNECT"),
        speak = member.hasPermission("SPEAK"),
        mute_members = member.hasPermission("MUTE_MEMBERS"),
        deafen_members = member.hasPermission("DEAFEN_MEMBERS"),
        move_members = member.hasPermission("MOVE_MEMBERS"),
        use_vad = member.hasPermission("USE_VAD"),
        change_nickname = member.hasPermission("CHANGE_NICKNAME"),
        manage_nicknames = member.hasPermission("MANAGE_NICKNAMES"),
        manage_roles = member.hasPermission("MANAGE_ROLES"),
        manage_webhooks = member.hasPermission("MANAGE_WEBHOOKS"),
        manage_emojis = member.hasPermission("MANAGE_EMOJIS")
    }

    return clientPermissions;
}