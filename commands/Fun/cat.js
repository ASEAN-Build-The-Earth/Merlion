const axios = require('axios');
const Dis = require('discord.js')
module.exports = {
    name: 'cat',
    description: 'USes an API to grab cat images ',
    execute(message, args) {
        axios.get('https://api.thecatapi.com/v1/images/search')
            .then(async response => {
                const Msg = new Dis.MessageEmbed()
                    .setDescription("This is your cat! Meowwwww")
                    .setColor("BLUE")
                    .setImage(response.data[0].url)
                message.reply({ embeds: [Msg] });
            });
    },
};