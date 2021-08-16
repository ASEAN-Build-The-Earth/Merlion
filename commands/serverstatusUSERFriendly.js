
// axios.get('https://mcapi.us/server/status?ip=asean.my.to')
// .then(response => {
//   console.log(response.data);
// });


const Discord = require('discord.js');
const axios = require('axios');


module.exports = {
  name: 'srv',
  description: 'USes an API to grab server status ',
  execute(message, args) {
      axios.get('https://mcapi.us/server/status?ip=asean.my.to')
      .then(response => {
        console.log(response.data.status);
        if (response.data.online = "True") {
          ServerOnline = "Yes";
        } 
        else {
          //  block of code to be executed if the condition is false
          ServerOnline = "No";
        }
        //embed
        const srv = new Discord.MessageEmbed()
        .setColor('#00FF00')
        .setTitle('Server Status')
        .addFields(
          { name: "Server Online?", value: `${ServerOnline}` },
          { name: "Player count", value: `${response.data.players.now} /${response.data.players.max}` },
          { name: "Request", value: `${response.data.status}` },
        )            
        .setImage (response.data.message)
    message.channel.send(srv);
      });  
  },
};
