const axios = require('axios');
const Discord = require('discord.js')

module.exports = {
    name: 'panda',
    description: 'Uses an API to grab panda images ',
    execute(message, args) {
        axios.get('https://some-random-api.ml/img/panda')
            .then(async response => {
                const Msg = new Discord.MessageEmbed()
                    .setDescription("Here is your panda, uwu")
                    .setColor("#e6f5ff")
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setImage(response.data.link)
                message.reply({ embeds: [Msg] });
            });
    },
};
