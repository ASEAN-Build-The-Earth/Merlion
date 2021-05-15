const Discord = require('discord.js');
module.exports = {
  name: 'faq1',
  description: 'The first faq page',
  execute(message){
const faq1 = new Discord.MessageEmbed()
.setColor('#00FFFF')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle ('Faq')
    .addFields( 
      {name: "1. How to Contribute?", value: "Join this server https://discord.gg/Mg54bVk and follow the instructions given"},
      )
   .setFooter('Last updated on 22/3/2021','https://images-ext-1.discordapp.net/external/j2-U816cNP_653mZv8L7hc1Q6TN6D9NhahEx5QMjPYs/%3Fsize%3D128/https/cdn.discordapp.com/icons/702883639574396969/0a9741c68d97fd00de8458d20fd9b513.png');
   message.channel.send(faq1);
}
}