const Discord = require('discord.js')
const axios = require('axios');
module.exports = {
    name: "cases",
    execute(message, args) {
        
        axios.get(`https://disease.sh/v3/covid-19/countries/${String(args[0])}`)
            .then(response => 
            {
                const embed = new Discord.MessageEmbed()
                .setColor("#A8542D")
                .setTitle("COVID-19 statistics")
                .setThumbnail(`${response.data.countryInfo.flag}`)
                	.addFields(
                    { name: 'Total cases', value: `${response.data.cases}`},
                    { name: 'Total cases reported today', value: `${response.data.todayCases}`, inline: true},
		                { name: 'Total deaths', value: `${response.data.deaths}`},
		                { name: 'Total deaths reported today', value: `${response.data.todayDeaths}`, inline: true },
                    { name: 'Total recoveries', value: `${response.data.recovered}`},
                    { name: 'Total recoveries reported today', value: `${response.data.todayRecovered}`, inline: true},
                    { name: 'Active cases', value: `${response.data.active}`},
                    {name: 'Critical cases', value: `${response.data.critical}`, inline: true},)
                message.reply({ embeds: [embed]});}
        ).catch(error => 
            {
                console.error(`Could not send Cases DM to ${message.author.tag}.\n`, error);
                message.reply(`Error found: https://disease.sh/v3/covid-19/countries/${String(args[0])} \n` +  `\`\`\`\n` 
                + error + "\n" 
                + error.response.data  + "\n" 
                + error.response.status + "\n" 
                + error.response.headers + "\n" 
                + `\`\`\`\n`);
                // message.reply('it seems like I can\'t DM you!');
            }
            
        );
    }
}
