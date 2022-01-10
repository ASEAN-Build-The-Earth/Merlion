// upgraded from: https://github.com/sapphiredev/examples/blob/main/examples/with-javascript/src/listeners/ready.js

const { Listener } = require('@sapphire/framework');
const { prefix, owners, bot_name } = require("../data/config.json");

const dev = process.env.NODE_ENV !== 'production';

class UserEvent extends Listener
{
	constructor(context, options = {}) 
    {
		super(context, 
        {
			...options,
			once: true
		});
	}

	run() 
    {
        const { client } = this.container;

        this.initializeBot(client);
        // print console banner in debug console
		this.printBanner();
		this.printStoreDebugInformation(client);
	}

    initializeBot(client)
    {
        // set activity to our bot
        /*
        client.user.setPresence({
            status: "offline",
            activity: { name: `@${client.user.username} help` },
            type: "LISTENING",
        });
        */

        client.user.setActivity(`YOU`, {
            type: "WATCHING",
        });
    }

	printBanner() 
    {
		const success = '+';

		const line01 = '';
		const line02 = '';
		const line03 = '';

		// Offset Pad
		const pad = ' '.repeat(7);

        // Banner
		console.log(
        `- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n`
		+ String.raw`
            ${line01} ${pad}${`${bot_name} v1.2.0`}
            ${line02} ${pad}[${success}] Gateway
            ${line03}${dev ? ` ${pad}${'<'}${'/'}${'>'} ${'DEVELOPMENT MODE'}` : ''}
		`.trim()
        + `\n\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -`
		);
	}

	printStoreDebugInformation(client) 
    {
		const { logger } = this.container;
		const stores = [...client.stores.values()];
		const last = stores.pop();

        //#region --- Bot Data ---
        let list = [];
        client.stores.get("commands").paths.forEach((e) => { list.push(e)});

        for(let i = 0; i < list.length; i++) 
        { 
            let front = (i == list.length - 1) ? "└─ ": "├─ ";
            list[i] = front.concat(list[i]);
        }
        
        let ownersString = "";
        owners.forEach((e, i) => {
            ownersString = ownersString.concat(e.name + `${i < owners.length - 1 ? ", " : ""}`)
        });

        console.log(``
        + `Logged in as ${client.user.username}#${client.user.discriminator}\n`
        + `└─ prefix: ${prefix.norminal}\n`
        + `└─ regex prefix: ${prefix.special.examples[0]}, ${prefix.special.examples[1]}, ${prefix.special.examples[2]}\n`
        + `└─ owners: ${ownersString}\n`
        + `\t└─ Registered commands at:\n\t\t${list.toString().replace(",", "\n\t\t")}`);
        //#endregion

        // --- loaded data ---
        for (const store of stores) logger.info(this.styleStore(store, false));
        logger.info(this.styleStore(last, true)); 
    }

    styleStore(store, last) {
        return `${last ? '└─' : '├─'} Loaded ${store.size.toString().padEnd(3, ' ')} ${store.name}.`;
    }
}

exports.UserEvent = UserEvent;