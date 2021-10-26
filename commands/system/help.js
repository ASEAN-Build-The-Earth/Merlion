const { Command } = require("@sapphire/framework");
const { reply, get, send } = require("@sapphire/plugin-editable-commands");
const Discord = require("discord.js");

class NewCommand extends Command 
{
	constructor(context, options) 
    {
		super(context, {
			...options,
      		name: "help",
			aliases: ["helps", "hlep"],
            category: "test",
			description: "a description",
            detailedDescription: "this is so detailed",
            usage: "uwu"
		});
	}

	async messageRun(message, args) 
	{
        const { logger, client } = this.container;

        const temp = new Discord.MessageEmbed()
            .setColor("#b3b3ff")
            .setDescription("*proccessing*");
        // send await embed waiting for bot to grab api
        await reply(message, { embeds: [temp] });

        let helpEmbed = new Discord.MessageEmbed()
            .setColor("#b3b3ff")
            .setTitle("Merlion Advaliable Commands")
            .setFooter((new Date()).toUTCString());

        //#region Main Commands Searching Loop
        const commands = client.stores.get("commands");
        let assignSubCategory = [];
        for(let i = 0; i < commands.categories.length; i++)
        {        
            // root category commands
            helpEmbed.addFields({ name: `**${commands.categories[i]} commands**`, value: `│` });

            commands.forEach((element) => {
                if(element.fullCategory.includes(commands.categories[i]))
                {
                    // see if command has sub category
                    if(element.fullCategory[1] === undefined)
                    {
                        helpEmbed.addFields({ name:  `│  **${client.fetchPrefix()}${element.name}**`, value: `\n│    └─  ${element.description}` });
                    }
                    else
                    {
                        if(!assignSubCategory.includes(element.fullCategory[1]))
                        {
                            assignSubCategory.push(element.fullCategory[1].toString().toLowerCase());
                            helpEmbed.addFields({ name: `│ **${element.fullCategory[1]} commands**`, value: `│ │` });
                        }

                        if(element.fullCategory.includes(element.fullCategory[1]))
                        {
                            helpEmbed.addFields(
                                { name:  `│ │  **${client.fetchPrefix()}${element.name}**`, value: `\n│ │    └─  ${element.description}` }
                            );
                        }
                    }

                    
                }
            }); 
        }
        //#endregion

        const success = new Discord.MessageEmbed().setColor("#42f560").setDescription("I've send you command in your dm!");
        // send await embed waiting for bot to grab api
        return get(message).edit({ embeds: [success] }).then(() => {
            try {
                message.author.send({ embeds: [helpEmbed] });
            } catch(error) {
                logger.debug("Cannot send DM to " + message.author + "\n" + error);
                return reply(message, "Looks like i cant DM you help message");  
            }
            
        });
	}
}

module.exports.NewCommand = NewCommand;