
const Discord = require('discord.js');
const axios = require('axios');


module.exports = {
    name: 'dog',
    description: 'USes an API to grab dog images',
    execute(message, args) {
        axios.get('https://dog.ceo/api/breeds/image/random') 
        .then(async response => {
          console.log(response.data.message);

          const dog = new Discord.MessageEmbed()
          .setColor('#00FF00')
          .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
          .setTitle ('Here Have a dog image')
          .setImage (response.data.message)
          message.channel.send({ embeds: [dog] });
        });  
          
    },
};

