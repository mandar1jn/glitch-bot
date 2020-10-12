module.exports = async (client, message, guild_info) => {
    let prefix = guild_info.prefix
    const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
    const cmd = args.shift().toLowerCase();

    if (cmd.length < 1) return;

    let command = client.commands.get(cmd);
    if (!command) {
        command = client.commands.get(client.aliases.get(cmd));
    }
    
    if (command) {
        return command.run(client, {message, args});
    }
}