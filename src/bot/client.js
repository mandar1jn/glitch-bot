const Discord = require('discord.js');
const fs = require('fs');
const developers = require('./databases/developers.json');
const client = new Discord.Client({
	shards: 'auto',
	disableMentions: 'everyone'
});
const DBL = require('dblapi.js');
var dbl = new DBL(process.env.TOPAPI, client);
const blacklistedservers = require('./databases/blacklistedservers.json');
module.exports = client;

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

['command'].forEach(handler => {
	require(`./handlers/${handler}`)(client);
});

fs.readdir('./src/bot/events/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const event = require(`./events/${file}`);
		let eventName = file.split('.')[0];
		client.on(eventName, event.bind(null, client));
		delete require.cache[require.resolve(`./events/${file}`)];
	});
});

fs.readdir('./src/bot/dblevents/', (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		if (!file.endsWith('.js')) return;
		const dblEvent = require(`./dblevents/${file}`);
		let dblEventName = file.split('.')[0];
		client.on(dblEventName, dblEvent.bind(null, dbl));
		delete require.cache[require.resolve(`./dblevents/${file}`)];
	});
});

client.on('message', async message => {
	
	if (!blacklistedservers[message.guild.id]) {
		blacklistedservers[message.guild.id] = false;
		fs.writeFile(
			`./src/bot/databases/blacklistedservers.json`,
			JSON.stringify(blacklistedservers),
			err => {
				if (err) console.log(err);
			}
		);
	}

	let guild_info = require(`./src/bot/databases/guild info/${message.guild.id}.json`);

	if (!guild_info.prefix) {
		guild_info = {
			prefix: process.env.PREFIX
		};
	}

	fs.writeFile(
		`./src/bot/databases/guild info/${message.guild.id}.json`,
		JSON.stringify(guild_info),
		err => {
			if (err) console.log(err);
		}
	);

	const prefix = process.env.PREFIX;

	if (message.author.bot) return;
	if (!message.guild) return;
	if (!message.content.startsWith(prefix)) return;
	if (!message.member)
		message.member = await message.guild.fetchMember(message);

	if (
		blacklistedservers[message.guild.id] === true &&
		developers[message.author.id] != true
	) {
		return message.channel.send('This server is blacklisted!');
	}

	const args = message.content
		.slice(prefix.length)
		.trim()
		.split(/ +/g);
	const cmd = args.shift().toLowerCase();

	if (cmd.length === 0) return;

	let command = client.commands.get(cmd);
	if (!command) command = client.commands.get(client.aliases.get(cmd));

	if (command) {
		command.run(client, message, args, dbl);
	}
});

client.login(process.env.TOKEN);
