module.exports = {
	name: 'website',
	description: 'Sends a link to our official website',
	category: 'general',
	run: async (client, message, args) => {
		message.channel.send(
			'Do you want to visit our official website? Go to https://glitch-bot--marijnkneppers.repl.co'
		);
	}
};
