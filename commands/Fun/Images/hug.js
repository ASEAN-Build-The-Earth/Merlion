const axios = require('axios');
const Discord = require('discord.js')

module.exports = {
    name: 'hug',
    description: 'Uses an API to send anime hug gifs',
    execute(message, args) {
        axios.get('https://some-random-api.ml/animu/hug')
            .then(async response => {
                let targetMember = message.mentions.members.first();
                const Embed = new Discord.MessageEmbed()
                  .setDescription(`Here is a huge hug to you <@${message.author.id}>`)
                  .setImage(response.data.link)
                  .setColor("#e6f5ff")
                if(!targetMember) return message.reply({ embeds: [Embed] });

                  const Msg = new Discord.MessageEmbed()
                      .setDescription(`<@${message.author.id}> just gave a huge hug to <@${targetMember.id}>`)
                      .setColor("#e6f5ff")
                      .setImage(response.data.link)
                  message.reply({ embeds: [Msg] });
            });
    },
};
