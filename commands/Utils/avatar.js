module.exports = {
	name: 'avatar',
	description: 'Show your avatar',
	execute(message) {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
		}

		const avatarList = message.mentions.users.map(user => {
			return `${user.username}'s Avatar: ${user.displayAvatarURL({ dynamic: true })}`;
		});

		message.channel.send(avatarList);
	},
};