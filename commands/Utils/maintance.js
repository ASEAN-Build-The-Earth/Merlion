const Discord = require('discord.js');
module.exports = {
  name: 'ss',
  description: 'Server Status manualy set',
  execute(message){
const Status = new Discord.MessageEmbed()
.setColor('#00FF00')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle ('Server Status')
    .addFields( 
      { name: "Server Is Alive", value: "Server is currently alive and well" },
    )
   .setFooter( 'Rerember this is manualy set so it may be outdated');
   message.channel.send({ embeds: [Status]});
}
}

//pog comment
