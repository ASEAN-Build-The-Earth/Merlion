const { Events, Listener, LogLevel } = require('@sapphire/framework');

class UserEvent extends Listener {
	constructor(context, options = {}) {
		super(context, {
			...options,
			event: Events.CommandSuccess
		});
	}

	run({ message, command }) {
		const shard = this.shard(message.guild?.shardId ?? 0);
		const commandName = this.command(command);
		const author = this.author(message.author);
		const sentAt = message.guild ? this.guild(message.guild) : this.direct();
		this.container.logger.debug(`${shard} - ${commandName} ${author} | at: ${sentAt}`);
	}

	onLoad() {
		this.enabled = this.container.logger.level <= LogLevel.Debug;
		return super.onLoad();
	}

	shard(id) {
		return `[${id.toString()}]`;
	}

	command(command) {
		return command.name;
	}

	author(author) {
		return `${author.username}[${author.id}]`;
	}

	direct() {
		return 'Direct Messages';
	}

	guild(guild) {
		return `${guild.name}[${guild.id}]`;
	}
}

exports.UserEvent = UserEvent;