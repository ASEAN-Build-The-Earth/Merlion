const { MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
    name: 'test1',
    description: 'random message',
    execute(message, args) 
    {
        const row = new MessageActionRow()
			.addComponents(
            new MessageButton()
                .setLabel("uwu")
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY')
                .setDisabled(false)
            );

        message.reply({ content: 'Pong!', components: [row] });
    },
};