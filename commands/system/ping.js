// example file from: https://github.com/sapphiredev/examples/tree/main/examples/with-javascript

const { Command } = require("@sapphire/framework");
const { send } = require("@sapphire/plugin-editable-commands");

class PingCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "ping",
			aliases: ["pnig", "pign"],
			description: "ping pong",
		});
	}

	async messageRun(message) 
	{
		const msg = await send(message, 'Ping?');

		const content = `Pong from JavaScript! Bot Latency ${Math.round(this.container.client.ws.ping)}ms. API Latency ${
			msg.createdTimestamp - message.createdTimestamp
		}ms.`;

		return send(message, content);
	}
}

module.exports.PingCommand = PingCommand;