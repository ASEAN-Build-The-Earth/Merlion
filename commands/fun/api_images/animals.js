/**
 * All data from: https://some-random-api.ml
 */
const { Command } = require("@sapphire/framework");
const reader = require("#util/api_reader.js")

const api = 
{
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

class DogCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "dog", aliases: ["doggo", "doggy", "doge", "dogs"],
		description: "Uses an API to grab dog",
	}); }
	async messageRun(message) {
        // 1:<message>, 2:<display name>, 2:<api of this command>, 2:<embed color>
        reader.InitNewAnimalCommand(message, this.name, api.dog, "#d27979");
	}
}

class BirdCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "bird", aliases: ["birb", "birbby", "birds"],
		description: "Uses an API to grab bird image",
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.bird, "#ace600");
	}
}

class CatCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "cat",
		description: "Uses an API to grab cat image",
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.cat, "#80ccff");
	}
}

class PandaCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "panda",
		description: "Uses an API to grab panda image",
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.panda, "#e6f5ff");
	}
}

class RedPandaCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "redpanda",
		description: "Uses an API to grab red panda image",
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, "red panda", api.redPanda, "#990000");
	}
}

class FoxCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "fox",
		description: "Uses an API to grab fox image",
		category: "animals_api"
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.fox, "#990000");
	}
}

class RaccoonCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "raccoon",
		description: "Uses an API to grab raccoon image"
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.raccoon, "#990000");
	}
}

class KangarooCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "kangaroo",
		description: "Uses an API to grab kangaroo image",
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.kangaroo, "#990000");
	}
}

class KoalaCommand extends Command { constructor(context, options) { super(context, 
    { ...options,
      	name: "koala",
		description: "Uses an API to grab koala image",
	}); }
	async messageRun(message) {
        reader.InitNewAnimalCommand(message, this.name, api.koala, "#990000");
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