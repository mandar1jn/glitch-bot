const path = require("path");
const fs = require("fs");

module.exports.registerEvents = async (client, dbl) => {
	fs.readdir(path.resolve("src/bot/events/client/"), (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith(".js")) {
                return;
            }
			const event = require(path.resolve(
				`src/bot/events/client/${file}`
			));
			let eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
			delete require.cache[
				require.resolve(path.resolve(`src/bot/events/client/${file}`))
			];
		});
	});

	fs.readdir(path.resolve("src/bot/events/process/"), (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith(".js")) {
                return;
            }
            
			const event = require(path.resolve(
				`src/bot/events/process/${file}`
			));
			let eventName = file.split(".")[0];
			process.on(eventName, event.bind(null, process));
			delete require.cache[
				require.resolve(path.resolve(`src/bot/events/process/${file}`))
			];
		});
	});

	fs.readdir(path.resolve("src/bot/events/dbl/"), (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith(".js")) return;
			const event = require(path.resolve(`src/bot/events/dbl/${file}`));
			let eventName = file.split(".")[0];
			dbl.on(eventName, event.bind(null, dbl));
			delete require.cache[
				require.resolve(path.resolve(`src/bot/events/dbl/${file}`))
			];
		});
	});

	fs.readdir(path.resolve("src/bot/events/dbl-webhook/"), (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith(".js")) return;
			const event = require(path.resolve(
				`src/bot/events/dbl-webhook/${file}`
			));
			let eventName = file.split(".")[0];
			dbl.webhook.on(eventName, event.bind(null, dbl.webhook));
			delete require.cache[
				require.resolve(
					path.resolve(`src/bot/events/dbl-webhook/${file}`)
				)
			];
		});
	});
};

module.exports.registerManagerEvents = async (manager) => {
	fs.readdir(path.resolve("src/bot/events/manager/"), (err, files) => {
		files.forEach((file) => {
			if (!file.endsWith(".js")) return;
			const event = require(path.resolve(
				`src/bot/events/manager/${file}`
			));
			let eventName = file.split(".")[0];
			manager.on(eventName, event.bind(null, manager));
			delete require.cache[
				require.resolve(path.resolve(`src/bot/events/manager/${file}`))
			];
		});
	});
};
