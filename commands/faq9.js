const Discord = require('discord.js');
module.exports = {
  name: 'faq9',
  description: 'The 9th faq page',
  execute(message){
const faq9 = new Discord.MessageEmbed()
.setColor('#00FFFF')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle ('Faq')
    .addFields( 
      {name:"9.Building on Bedrock?", value: "The ASEAN server only supports Java with BTE modpack, if you still want to contribute to the project on Minecraft Bedrock (not in Southeast Asia region), please join the IP: \nbedrock.buildtheearth.net PORT: 19132\nBuild teams that support bedrock: https://docs.google.com/document/d/1ScjvcQovsMwxTL5AjDF9O99_CAa5sOcSc_H64OtSG7w/edit "},
      )
   .setFooter('Last updated on 22/3/2021','https://images-ext-1.discordapp.net/external/j2-U816cNP_653mZv8L7hc1Q6TN6D9NhahEx5QMjPYs/%3Fsize%3D128/https/cdn.discordapp.com/icons/702883639574396969/0a9741c68d97fd00de8458d20fd9b513.png');
   message.channel.send(faq9);
}
}