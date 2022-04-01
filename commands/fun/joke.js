const { Command } = require("@sapphire/framework");
const { MessageEmbed } = require('discord.js');
const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { SendEmbed } = require("#util/embed.js");

class JokeCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "joke",
			description: "Uses an API to grab jokes"
		});
	}

	async messageRun(message) {
        const pendingEmbed = new SendEmbed(message)
        await pendingEmbed.sendPendingEmbed("_thinking joke_", "_Sorry, can't think of any joke_")

        fetch("https://some-random-api.ml/joke", FetchResultTypes.JSON)
        .then(async (response) => {
            const jokeEmbed = new MessageEmbed().setColor("#b3b3ff").setDescription(response.joke)
            pendingEmbed.resolve({ embeds: [jokeEmbed] });
        })
        .catch((error) => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("_Sorry, can't think of any joke_");
            pendingEmbed.reject({embed: errorEmbed, error: { data: error, message:"failed to fetch joke api" }})
        });
	}
}

module.exports.JokeCommand = JokeCommand;