const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
module.exports = {
    name: 'test1 for buttons',
    description: 'test for buttons feature',
    aliases:[''],
    execute: async(client, message, args) => {
        const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel("Primary")
                .setStyle("PRIMARY")
                );

            let embed = new MessageEmbed()
            .setTitle("Buttons Example")
            .setDescription("This is Button Description")
    message.channel.send({
        embeds: [embed],
        components: [row]

    })
            }

}