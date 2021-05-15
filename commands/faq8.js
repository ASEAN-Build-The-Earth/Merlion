const Discord = require('discord.js');
module.exports = {
  name: 'faq8',
  description: 'The 8th faq page',
  execute(message){
const faq8 = new Discord.MessageEmbed()
.setColor('#00FFFF')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle ('Faq')
    .addFields( 
      {name:"8. How do I join the build team?", value: "After you have downloaded the BTE modpack at info and loaded up Minecraft with that launcher, choose an option:"},
      {name:"1", value: "head over to Singleplayer and you will see the world Terra1-1 - preloaded or something like that with the BTE logo."},
      {name:"2", value: "Trial (Build in a Singapore housing area in our server; if you're applying for our team or subteams)"},
      {name:"Build a building and use that to apply for our build team at", value: "https://buildtheearth.net/bte-asean"},
      {name:"Not our build team?", value: "Head over to https://buildtheearth.net/buildteams/ or https://www.google.com/maps/d/viewer?mid=17R7avLDRU4FavUgyX2J_7QjCMx4FoD5k to search for your build team there."},
      )
   .setFooter('Last updated on 22/3/2021','https://images-ext-1.discordapp.net/external/j2-U816cNP_653mZv8L7hc1Q6TN6D9NhahEx5QMjPYs/%3Fsize%3D128/https/cdn.discordapp.com/icons/702883639574396969/0a9741c68d97fd00de8458d20fd9b513.png');
   message.channel.send(faq8);
}
}