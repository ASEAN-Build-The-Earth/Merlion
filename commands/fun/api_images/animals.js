const { Command } = require("@sapphire/framework");
const { MessageEmbed } = require('discord.js');
const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { SendEmbed } = require("#util/embed.js");
const api = {	
	/**
	 * All data from: https://some-random-api.ml
	 */
	dog: "https://some-random-api.ml/img/dog",
	bird: "https://some-random-api.ml/img/bird",
	cat: "https://some-random-api.ml/img/cat",
	panda: "https://some-random-api.ml/img/panda",
	redPanda: "https://some-random-api.ml/img/red_panda",
	fox: "https://some-random-api.ml/img/fox",
	raccoon: "https://some-random-api.ml/img/raccoon",
	kangaroo: "https://some-random-api.ml/img/kangaroo",
	koala: "https://some-random-api.ml/img/koala",
}

async function InitNewAnimalCommand(message, name, api, color) {
    const pendingEmbed = new SendEmbed(message)
    await pendingEmbed.sendPendingEmbed(`_thinking of ${name}_`, `_sorry, I cant think of any ${name}_`)

    fetch(api, FetchResultTypes.JSON)
    .then(async (response) => {
        const animalEmbed = new MessageEmbed()
            .setColor(color)
            .setAuthor({name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}`})
            .setTitle(`Here have a ${name} image`)
            .setImage(response.link)
        pendingEmbed.resolve({ embeds: [animalEmbed] });
    })
    .catch((error) => {
        const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription(`_sorry, I cant think of any ${name}_`);
        pendingEmbed.reject({embed: errorEmbed, error: { data: error, message:"failed to fetch animal api" }})
    });
}

/* register commands, I got no better idea other that this */
class DogCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "dog", aliases: ["doggo", "doggy", "doge", "dogs"],
		description: "get yourself a dog",
	}); }
	async messageRun(message) {
        // 1:<message>, 2:<display name>, 2:<api of this command>, 2:<embed color>
        InitNewAnimalCommand(message, this.name, api.dog, "#d27979");
	}
}

class BirdCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "bird", aliases: ["birb", "birbby", "birds"],
		description: "get yourself a bird",
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.bird, "#ace600");
	}
}

class CatCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "cat",
		description: "get yourself a cat",
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.cat, "#80ccff");
	}
}

class PandaCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "panda",
		description: "get yourself a panda",
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.panda, "#e6f5ff");
	}
}

class RedPandaCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "redpanda",
		description: "get yourself a red panda",
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, "red panda", api.redPanda, "#990000");
	}
}

class FoxCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "fox",
		description: "get yourself a fox",
		category: "animals_api"
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.fox, "#990000");
	}
}

class RaccoonCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "raccoon",
		description: "get yourself a raccoon"
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.raccoon, "#990000");
	}
}

class KangarooCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "kangaroo",
		description: "get yourself a kangaroo",
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.kangaroo, "#990000");
	}
}

class KoalaCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "koala",
		description: "get yourself a koala bear",
	}); }
	async messageRun(message) {
        InitNewAnimalCommand(message, this.name, api.koala, "#990000");
	}
}

// push all data to our module
module.exports.DogCommand      = DogCommand;
module.exports.BirdCommand     = BirdCommand;
module.exports.CatCommand      = CatCommand;
module.exports.PandaCommand    = PandaCommand;
module.exports.RedPandaCommand = RedPandaCommand;
module.exports.FoxCommand      = FoxCommand;
module.exports.RaccoonCommand  = RaccoonCommand;
module.exports.KangarooCommand = KangarooCommand;
module.exports.KoalaCommand    = KoalaCommand;