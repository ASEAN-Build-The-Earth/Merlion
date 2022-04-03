const { Command, SapphireClient } = require("@sapphire/framework");
const { SendEmbed } = require("#util/embed.js");
const { MessageEmbed } = require('discord.js');

class HelpCommand extends Command 
{
	constructor(context, options) 
    {
		super(context, {
			...options,
      		name: "help",
			aliases: ["helps", "hlep"],
			description: "get all available commands",
            detailedDescription: "this is so detailed",
            cooldownDelay: 10000,
		});
	}

	async messageRun(message, args) 
	{
        const { client } = this.container;
        const pendingEmbed = new SendEmbed(message);
        await pendingEmbed.sendPendingEmbed("_proccessing_", "_Sorry, unable to get data._", { timeout: 5000 })

        const helpEmbed = new MessageEmbed()
            .setColor("#ffc561")
            .setTitle(":earth_asia: **Merlion Advaliable Commands**")
            .setThumbnail("https://builders-doc.netlify.app/media/icons/aseanbte_logo.gif")
            .setFooter({text: (new Date()).toUTCString()});

        fetchNewHelpData(client, (pendingCategory) => {
            helpEmbed.addFields(pendingCategory);
        });

        /* check and catch error if succesfully send help embed to author's dm */
        await message.author.send({ embeds: [helpEmbed] }).catch(error => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("Looks like i can't DM you the help message");
            return pendingEmbed.reject({embed: errorEmbed, error: { data: error, message:`Cannot send DM to ${message.author}` }});
        });
        /* resolve for final success embed */
        const success = new MessageEmbed().setColor("#42f560").setDescription("I've send you command in your dm!");
        return pendingEmbed.resolve({ embeds: [success] });
        
	}
}

/**
 * fetch a new embed data to add
 * @param {SapphireClient} client main container's client to get data on
 * @param {Function} callback callback function execute when the process is ready to add in new data to embed.
 * {@param pendingCategory} the embed object pending to be add in help embed.
 */
function fetchNewHelpData(client, callback) {
    const commands = client.stores.get("commands");
    let assignSubCategory = [];
    for(let i = 0; i < commands.categories.length; i++) {        
        let categoryContent = ""
        commands.forEach((element) => {
            if(element.fullCategory.includes(commands.categories[i])) {
                /* see if command has sub category */
                if(element.fullCategory[1] === undefined) {
                    /* make unique category dropdown for sub commands */
                    if(element.subCommands !== undefined) {
                        categoryContent = categoryContent.concat(`> **${title(element.name)}**: ${element.description}\n` );

                        let assignEntries = [];
                        element.subCommands.entries.forEach((e) => {
                            if(!assignEntries.includes(e.output)) {
                                assignEntries.push(e.output);
                                categoryContent = categoryContent.concat(`> <:reply:960082754362564671> **\`${client.fetchPrefix()}\`${element.aliases[0]} ${e.input}**\n` );  
                            }
                        });
                        return;
                    }   
                    categoryContent = categoryContent.concat(`> **\`${client.fetchPrefix()}\`${element.name}**: ${element.description}\n` );
                }
                else {/* if the category has another sub category */ 
                    if(!assignSubCategory.includes(element.fullCategory[1])) {
                        assignSubCategory.push(element.fullCategory[1].toString().toLowerCase());
                        categoryContent = categoryContent.concat(`> **${title(element.fullCategory[1])} Commands**\n`);
                    }
                    if(element.fullCategory.includes(element.fullCategory[1])) {
                        categoryContent = categoryContent.concat(`> <:reply:960082754362564671>  **\`${client.fetchPrefix()}\`${element.name}**: ${element.description}\n`);
                    }
                }
            }
        });
        /* apply category and its value to modifier */
        callback({ name: `:link: **${title(commands.categories[i])} Commands**`, value: categoryContent });
    }
}
function title(str) {
    return str
        .split('_')
        .map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
}

module.exports.HelpCommand = HelpCommand;