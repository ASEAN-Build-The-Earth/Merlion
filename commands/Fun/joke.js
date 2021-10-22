const Discord = require('discord.js');
const axios = require('axios');


module.exports = {
    name: 'joke',
    description: 'Uses an API to grab jokes',
    execute(message, args) {
        axios.get('https://some-random-api.ml/joke')
            .then(async response => {
                const joke = new Discord.MessageEmbed()
                    .setColor('#b3b3ff')
                    .setDescription(response.data.joke)
                message.reply({ embeds: [joke] });
            });

    },
};
