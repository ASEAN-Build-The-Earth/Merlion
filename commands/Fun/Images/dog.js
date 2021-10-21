const Discord = require('discord.js');
const axios = require('axios');


module.exports = {
    name: 'dog',
    description: 'Uses an API to grab dog images',
    execute(message, args) {
        axios.get('https://some-random-api.ml/img/dog')
            .then(async response => {

                const dog = new Discord.MessageEmbed()
                    .setColor('#d27979')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setTitle('Here have a dog image')
                    .setImage(response.data.link)
                message.reply({ embeds: [dog] });
            });

    },
};
