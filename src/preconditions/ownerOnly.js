const { Precondition } = require('@sapphire/framework');
const { owners } = require('../data/config.json');

/**
 * OwnerOnly preconditions, 
 * identify by putting `preconditions: ["ownerOnly"]` to the command class options
 * @returns Precondition error if message sent is not by owner from config.json
 */
class UserPrecondition extends Precondition 
{
	async run(message) 
	{
		let byOwner = false;
		owners.forEach((element) => {
			if(byOwner) return;
			element.id.includes(message.author.id) ? byOwner = true : byOwner = false;
		});
		return byOwner ? this.ok() : this.error({ message: "This command can only be used by the owners.", identifier: "ownerOnly" });
	}
}

module.exports.UserPrecondition = UserPrecondition;