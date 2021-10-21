const axios = require('axios');
const Dis = require('discord.js')
module.exports = {
    name: 'redpanda',
    description: 'Uses an API to grab red panda images ',
    execute(message, args) {
        axios.get('https://some-random-api.ml/img/red_panda')
            .then(async response => {
                const Msg = new Dis.MessageEmbed()
                    .setColor("#990000")
                    .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
                    .setImage(response.data.link)
                message.reply({ embeds: [Msg] });
            });
    },
};
