const path = require("path");
const fs = require("fs");

async function registerEvents(object, folderPath){
    fs.readdir(path.resolve(folderPath.toString()), (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith(".js")) {
                return;
            }
			const event = require(path.resolve(
				folderPath.toString() + file
			));
			let eventName = file.split(".")[0];
			object.on(eventName, event.bind(null, object));
			delete require.cache[
				require.resolve(path.resolve(folderPath.toString() + file))
			];
		});
	});
}

module.exports.registerEvents = async (client, dbl) => {
	
    registerEvents(client, "src/bot/events/client/");

    registerEvents(process, "src/bot/events/process/");

    registerEvents(dbl, "src/bot/events/dbl/");

    registerEvents(dbl.webhook, "src/bot/events/dbl-webhook/");

};

module.exports.registerManagerEvents = async (manager) => {

    registerEvents(manager, "src/bot/events/manager/");

};