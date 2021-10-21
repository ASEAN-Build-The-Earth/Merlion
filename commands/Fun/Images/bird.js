const Discord = require('discord.js');
const axios = require('axios');


module.exports = {
    name: 'bird',
    description: 'Uses an API to grab bird images',
    execute(message, args) {
        axios.get('https://some-random-api.ml/img/bird')
            .then(async response => {

                const bird = new Discord.MessageEmbed()
                    .setColor('#ace600')
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setImage(response.data.link)
                message.reply({ embeds: [bird] });
            });

    },
};
