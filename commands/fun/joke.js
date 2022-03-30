const { Command } = require("@sapphire/framework");
const axios = require('axios');
const { MessageEmbed } = require('discord.js');
const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { SendEmbed } = require("#util/embed.js");

class NewCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "joke",
			description: "Uses an API to grab jokes"
		});
	}

	async messageRun(message) {
        const pendingEmbed = new SendEmbed(message)
        await pendingEmbed.sendPendingEmbed("*thinking joke*")

        fetch("https://some-random-api.ml/joke", FetchResultTypes.JSON)
        .then(async (response) => {
            const jokeEmbed = new MessageEmbed().setColor("#b3b3ff").setDescription(response.joke)
            pendingEmbed.resolve(jokeEmbed);
        })
        .catch((error) => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("*sorry, I cant think of any joke*");
            pendingEmbed.reject({errorEmbed: errorEmbed, error: { data: error, message:"failed to fetch joke api" }})
        });
	}
}

module.exports.NewCommand = NewCommand;