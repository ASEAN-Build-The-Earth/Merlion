const { Client, Message, MessageEmbed } = require("discord.js")
const { pagination } = require('reconlx')

module.exports = {
    name:"pages",
    /**
     * @param {Client}  client
     * @param {Message}  message
     * @param {String[]} args
     */
    execute: async (client, message, args) => {
        const embed1 = new MessageEmbed().setTitle("one");
        const embed2 = new MessageEmbed().setTitle("two");
        const embed3 = new MessageEmbed().setTitle("three");
        const embed4 = new MessageEmbed().setTitle("four");
        const embeds = [
            embed1, 
            embed2, 
            embed3, 
            embed4
        ]

        pagination({
            embeds: embeds,
            message: message,
            time: 5000,

        })
    },
}