
const { Listener } = require('@sapphire/framework');
const Discord = require('discord.js');
const { send, get } = require("@sapphire/plugin-editable-commands");

let errorMessageSent = 0;

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
		const defaultRateLimit = 5000;
		const defaultMessageLimit = 2;

		// catch expected error (ex. spam timeout)
		if(error.identifier !== undefined)
		{
			switch(error.identifier)
			{
				// modifying built-in cooldown error message here
				case "preconditionCooldown":
				{
					logger.debug(`[E] - timeout cooldown triggered: ${error.identifier} | by: ${message.author}`);

					const temp = new Discord.MessageEmbed()
					.setColor("#ff1a1a")
					.setDescription(`ey ey, no spam, wait more ${Math.ceil(error.context.remaining / 1000)} second${error.context.remaining > 1000 ? 's' : ''}`);

					if(errorMessageSent < defaultMessageLimit)
					{	
						return send(message, { embeds: [temp] })
						.then(() => { errorMessageSent += 1;
							setTimeout(() => {
								get(message).delete();
								errorMessageSent -= 1;
							}, error.context.remaining);
						});
					}
					break;
				}

				case "ownerOnly":
				{
					logger.debug(`[E] - someone trying to use ${error.identifier} command! | by: ${message.author}`);

					const temp = new Discord.MessageEmbed()
					.setColor("#ff1a1a")
					.setDescription(`hey this command is for bot owner only`);

					if(errorMessageSent < defaultMessageLimit)
					{	
						return send(message, { embeds: [temp] })
						.then(() => { errorMessageSent += 1;
							setTimeout(() => { // delete the message after ... seconds
								get(message).delete();
								errorMessageSent -= 1;
							}, defaultRateLimit);
						});
					}
					break;
				}

				case "workInProgress":
				{
					logger.debug(`[E] - someone invoked ${error.identifier} command! | by: ${message.author}`);

					const temp = new Discord.MessageEmbed()
					.setColor("#ff1a1a")
					.setDescription(`hey sorry, this command is a work-in-progress`);

					if(errorMessageSent < defaultMessageLimit)
					{	
						return send(message, { embeds: [temp] })
						.then(() => { errorMessageSent += 1;
							setTimeout(() => { // delete the message after ... seconds
								get(message).delete();
								errorMessageSent -= 1;
							}, defaultRateLimit);
						});
					}
					break;
				}

				default:
				{
					return logger.error("Unexpected error!: ", JSON.stringify(error));
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