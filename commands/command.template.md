## basic template of command reads by SapphireClients

```javascript

const { Command } = require("@sapphire/framework");

class NewCommand extends Command 
{
	constructor(context, options) 
    {
		super(context, {
			...options,
      		name: "name",
			aliases: ["nmae", "naem"],
			description: "a description",
            detailedDescription: "this is so detailed"
		});
	}

	async messageRun(message) 
	{
		message.reply("woa");
	}
}

module.exports.NewCommand = NewCommand;

```