const { Command, Logger } = require("@sapphire/framework");
const { send } = require("@sapphire/plugin-editable-commands");
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

class NewCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "button",
			aliases: ["uwu", "owo"],
			description: "ping pong",
		});
	}

	async messageRun(message) 
	{
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic:true }))
            .setTitle(`Testing Button`)
            .setDescription('`[ CLICK TO THE BUTTON FOR FREE FOODS ]`')

        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("uwu")
                .setCustomId('uwu') // custom ID to trigger button collector
                .setStyle('PRIMARY') // blurple style
                .setDisabled(false)
        );
        
        await send(message, { embeds: [embed], components: [row]});
            
        const filter = i => i.customId === 'uwu';// && i.user.id === '122157285790187530';

        const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

        collector.on('collect', async i => {
            if (i.customId === 'uwu') {
                console.log(i);
                await i.deferUpdate(); // reset button to clickable
                
                return  i.channel.send(`${i.user.username} clicked to the button!`);
                
               // await i.update({ content: 'A button was clicked!', components: [] });
            }
        });
                                 
        
	}
}

module.exports.NewCommand = NewCommand;