//requires fs to be able to read and acces files
const fs = require('fs');
//requires path to easily find the path in the project
const path = require('path');

const defaultguildinfo = JSON.parse(
	fs.readFileSync(path.resolve('src/bot/databases/defaultguildinfo.json'))
);

module.exports.validateDataFolders = async () => {
	//validates the guild info database folder
	await validateDataFolder(path.resolve("src/bot/databases/guild info/"));
	
	console.log('guild info has been validated.');

	//validates the xp database folder
	await validateDataFolder(path.resolve('src/bot/databases/xp/'))
	
	console.log('xp has been validated.');

	//validates the coins database folder
	await validateDataFolder('src/bot/databases/coins/');
	
	console.log('coins has been validated.');
};

module.exports.validateGuildData = async (guildID, guild_info) => {
	if (
		fs.existsSync(
			path.resolve(`src/bot/databases/guild info/${guildID}.json`)
		) !== true
	) {
		fs.writeFileSync(
			path.resolve(`src/bot/databases/guild info/${guildID}.json`),
			JSON.stringify(defaultguildinfo),
			function(err) {
				if (err) {
					console.log('error', err);
				}
			}
		);
	}

	if (
		fs.existsSync(path.resolve(`src/bot/databases/xp/xp-${guildID}.json`)) !==
		true
	) {
		fs.writeFileSync(
			path.resolve(`src/bot/databases/xp/xp-${guildID}.json`),
			'{}',
			function(err) {
				if (err) {
					console.log('error', err);
				}
			}
		);
	}

	if (
		fs.existsSync(
			path.resolve(`src/bot/databases/coins/coins-${guildID}.json`)
		) !== true
	) {
		fs.writeFileSync(
			path.resolve(`src/bot/databases/coins/coins-${guildID}.json`),
			'{}',
			function(err) {
				if (err) {
					console.log('error', err);
				}
			}
		);
	}

	if (guild_info.prefix === null) {
		guild_info = {
			prefix: process.env.PREFIX
		};
	}

	fs.writeFile(
		path.resolve(`src/bot/databases/guild info/${guildID}.json`),
		JSON.stringify(guild_info),
		function(err) {
			if (err) {
				console.log('error', err);
			}
		}
	);
};

async function validateDataFolder(folderPath) {
	if (!fs.existsSync(folderPath)) {
		fs.mkdirSync(folderPath, true, function(e) {
			if (e) {
				console.log('something went wrong while creating a directory: ' + e);
			}
		});
	}
}
