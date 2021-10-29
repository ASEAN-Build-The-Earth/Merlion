const { Precondition } = require('@sapphire/framework');

/**
 * Work-In-Progress preconditions, 
 * identify by putting `preconditions: ["workInProgress"]` to the command class options
 * @returns Precondition error if message is marked as workInProgress
 */
class UserPrecondition extends Precondition 
{
	async run(message) 
	{
		return this.error({ message: "Sorry, this command is a work in progress", identifier: "workInProgress" });
	}
}

module.exports.UserPrecondition = UserPrecondition;