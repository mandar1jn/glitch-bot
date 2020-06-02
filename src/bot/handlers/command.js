const { readdirSync } = require("fs");
const path = require("path");

const ascii = require("ascii-table");

let table = new ascii("Commands");
table.setHeading("Command", "Load status", "Category");

module.exports = (client) => {
    readdirSync(path.resolve("src/bot/commands/")).forEach(dir => {
        const commands = readdirSync(path.resolve(`src/bot/commands/${dir}/`)).filter(file => file.endsWith(".js"));

        for (let file of commands) {
            let pull = require(path.resolve(`src/bot/commands/${dir}/${file}`));

            if (pull.name) {
                client.commands.set(pull.name, pull);
                table.addRow(file, '✅', pull.category);
            } else {
                table.addRow(file, `❌  -> missing a help.name, or help.name is not a string.`, pull.category);
                continue;
            }

            if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}