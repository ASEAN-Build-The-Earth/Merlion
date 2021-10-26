
const { Listener } = require('@sapphire/framework');
const Discord = require('discord.js');
const { send, get } = require("@sapphire/plugin-editable-commands");

let errorMessageSent = false;

class UserEvent extends Listener 
{
	async run({ context, message: content }, { message }) 
	{
		// `context: { silent: true }` should make UserError silent:
		// Use cases for this are for example permissions error when running the `eval` command.
		if (Reflect.get(Object(context), 'silent')) return;

		return send(message, { content, allowedMentions: { users: [message.author.id], roles: [] } });
	}

	// Error catching
	async run(error, { message }) 
	{
		const { logger } = this.container;

		// catch expected error (ex. spam timeout)
		if(error.identifier !== undefined)
		{
			switch(error.identifier)
			{
				// modifying built-in cool down error message here
				case "preconditionCooldown":
				{
					logger.debug(`[e] - timeout cooldown triggered: ${error.identifier} | by: ${message.author}`);

					const temp = new Discord.MessageEmbed()
					.setColor("#ff1a1a")
					.setDescription(`ey ey, no spam, wait more ${Math.ceil(error.context.remaining / 1000)} second${error.context.remaining > 1000 ? 's' : ''}`);

					if(!errorMessageSent)
					{	
						return send(message, { embeds: [temp] })
						.then(() => { errorMessageSent = true;
							setTimeout(() => {
								get(message).delete();
								errorMessageSent = false;
							}, error.context.remaining);
						});
					}
				}

				default:
				{
					return logger.error("Unecpected error!: ", JSON.stringify(error));
				}
			}
			
		}// end error
		else
		{
			return logger.error(error);
		}
	}
}

module.exports.UserEvent = UserEvent;