const { Command } = require("@sapphire/framework");
const { send, get } = require("@sapphire/plugin-editable-commands");
const axios = require('axios');
const Discord = require('discord.js');

class NewCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "joke",
			description: "Uses an API to grab jokes"
		});
	}

	async messageRun(message) 
	{
        const temp = new Discord.MessageEmbed()
            .setColor("#b3b3ff")
            .setDescription("*thinking joke*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });

        setTimeout(() => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor("#ff1a1a") // red
                .setDescription("*sorry, I cant think of any joke*");
            // send error if takes too long to respons
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);

        
        axios.get("https://some-random-api.ml/joke")
        .then(async response => {
            const joke = new Discord.MessageEmbed()
            .setColor("#b3b3ff")
            .setDescription(response.data.joke)

            // edit the embed with grabbed joke
            return get(message).edit({ embeds: [joke] });
        });
	}//end of command
}

module.exports.NewCommand = NewCommand;