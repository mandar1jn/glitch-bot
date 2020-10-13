module.exports = {
    disconnect: () => {
        console.warn("Disconnected!", "\n");
    },
    reconnecting: () => {
        console.log("Bot reconnecting...", "\n");
    },
    warn: (err) => {
        console.warn("[WARNING]", err, "\n");
    },
    error: (err) => {
        console.error(err.message, "\n");
    },
    discordAPIError: (err) => {
        console.log("[DiscordAPIError]", err, "\n");
    },
    uncaughtException: (err) => {
        console.error(`[uncaughtException] ${err.stack}`, "\n");
        process.exit(1);
    },
    unhandledRejection: (err) => {
        console.log("[unhandledRejection]", `Reason: ${err.stack}`, "\n");
    },
};