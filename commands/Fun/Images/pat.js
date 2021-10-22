const axios = require('axios');
const Discord = require('discord.js')

module.exports = {
    name: 'pat',
    description: 'Uses an API to send anime pat gifs',
    execute(message, args) {
        axios.get('https://some-random-api.ml/animu/pat')
            .then(async response => {
                let targetMember = message.mentions.members.first();
                const Embed = new Discord.MessageEmbed()
                  .setDescription(`Aww.. here is a pat to you from my side <@${message.author.id}>`)
                  .setImage(response.data.link)
                  .setColor("#e6f5ff")
                if(!targetMember) return message.reply({ embeds: [Embed] });

                  const Msg = new Discord.MessageEmbed()
                      .setDescription(`<@${message.author.id}> just gave a pat to <@${targetMember.id}>`)
                      .setColor("#e6f5ff")
                      .setImage(response.data.link)
                  message.reply({ embeds: [Msg] });
            });
    },
};
