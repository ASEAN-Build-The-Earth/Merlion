const Discord = require('discord.js')
const axios = require('axios');

module.exports = {
    name: "cases",
    execute(message, args) 
    {
        // --- Advaliable countries: https://github.com/disease-sh/API/blob/master/utils/countries.js

        // generated link for grabbing data
        let generatedLink = `https://disease.sh/v3/covid-19/countries/${String(args[0])}`;
        // shorterned link for printing text only(reduce word size)
        let shortLink = `disease.sh/v3/covid-19/countries/${String(args[0])}`

    // Error if we cant detect command's arguments
    if(args[0] === undefined) { message.reply(`this command needed an arguments`); return; }

        // --- Start Generating Embed Data ---
        axios.get(generatedLink)
        .then(response => 
            {
                const embed = new Discord.MessageEmbed()
                .setColor("#A8542D")
                .setTitle("COVID-19 statistics").setURL("https://disease.sh")
                .setDescription(`*data: [${shortLink}](${generatedLink})*`)
                .setThumbnail(`${response.data.countryInfo.flag}`)
                	.addFields(
                    { name: 'Total cases:', value: `${response.data.cases}`},
                    { name: 'Total cases reported today:', value: `${response.data.todayCases}`, inline: true},
		            { name: 'Total deaths:', value: `${response.data.deaths}`},
		            { name: 'Total deaths reported today:', value: `${response.data.todayDeaths}`, inline: true },
                    { name: 'Total recoveries:', value: `${response.data.recovered}`},
                    { name: 'Total recoveries reported today:', value: `${response.data.todayRecovered}`, inline: true},
                    { name: 'Active cases:', value: `${response.data.active}`},
                    {name: 'Critical cases:', value: `${response.data.critical}`, inline: true},)
                .setFooter("disease.sh - Open Disease Data API");
                message.reply({ embeds: [embed]});
            }
        ).catch(error => //catch error if embed generating failed
            {
                console.error(`Could not send Cases Message to ${message.author.tag}.\n`, error);
                message.reply(`Invalid Input: ${generatedLink} \n`);
            }
        );
    }
}
