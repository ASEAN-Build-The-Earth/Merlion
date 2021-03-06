const { Command } = require("@sapphire/framework");
const { send } = require("@sapphire/plugin-editable-commands");
const Uwuifier = require("uwuifier");

class UwuCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "uwu",
			aliases: ["owo", "qwq"],
			description: "uwuify your sentence",
		});
	}

	async messageRun(message, args) 
	{
        await send(message, "uwuifyng");
        const uwuifier = new Uwuifier();
        const uwuifailed = uwuifier.uwuifySentence("sorry i cant uwuify your sentence");

        const argsContext = await args.parser.parserOutput.ordered;
        const argslength = await argsContext.length;

        const uwuifyerization = (text, failedText, type) => {
            switch (type)
            {
                case "WORD":
                    return uwuifier.uwuifyWords((typeof text === "string") ? text : failedText );
                case "SENTENCE":
                    return uwuifier.uwuifySentence((typeof text === "string") ? text : failedText );
                default:
                    return failedText;
            }
        }

        if(argslength <= 0)
            return send(message, uwuifailed);

        // arguments not failed
        let argsSentence = await args.rest("string");

        // bad bad bad
        if(argsSentence.match(/@here|@everyone/gi)) {
            argsSentence = argsSentence.replace(/@here/gi, "๑here");
            argsSentence = argsSentence.replace(/@everyone/gi, "๑everyone");
        }

        if(argslength === 1)
        {
            const uwuified = await uwuifyerization(argsSentence, uwuifailed, "WORD");
            return send(message, uwuified);
        }

        if(argslength > 1)
        {
            const uwuified = await uwuifyerization(argsSentence, uwuifailed, "SENTENCE");
            return send(message, uwuified);
        }

        
		
	}
}

module.exports.UwuCommand = UwuCommand;