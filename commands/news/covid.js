const { Command } = require("@sapphire/framework");
const { send, get } = require("@sapphire/plugin-editable-commands");
const axios = require('axios');
const Discord = require('discord.js');

class NewCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "covid",
            aliases: ["cases"],
			description: "Uses an API to covid data"
		});
	}

	async messageRun(message, args) 
	{
        const { logger } = this.container;
        const argsContext = args.parser.parserOutput.ordered;
        let success = false;

        const temp = new Discord.MessageEmbed()
            .setColor("#b3b3ff")
            .setDescription("*grabbing data*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });

        let errorEmbed = new Discord.MessageEmbed()
                .setColor("#ff1a1a") // red

        setTimeout(() => {
            errorEmbed.setDescription("*sorry, I cant grab your data*");
            if(success) return;
            // send error if takes too long to respons
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);

        if(argsContext[0] === undefined) 
        { 
            errorEmbed.setDescription("*this command needed an arguments*");
            return get(message).edit({ embeds: [errorEmbed] }).then(() => { success = true; });
        }

        // --- Advaliable countries: https://github.com/disease-sh/API/blob/master/utils/countries.js

        // generated link for grabbing data
        let generatedLink = `https://disease.sh/v3/covid-19/countries/${String(argsContext[0].value)}`;
        // shorterned link for printing text only(reduce word size)
        let shortLink = `disease.sh/v3/covid-19/countries/${String(argsContext[0].value)}`

        // Error if we cant detect command's arguments
        

        // --- Start Generating Embed Data ---
        axios.get(generatedLink)
        .then(response => 
            {
                const covidEmbed = new Discord.MessageEmbed()
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
                return get(message).edit({ embeds: [covidEmbed] }).then(() => { success = true; });
            }
        ).catch(error => //catch error if embed generating failed
            {
                errorEmbed.setDescription("*sorry, I cant grab your data.* (*" + `[${shortLink}](${generatedLink})*)`);
                return get(message).edit({ embeds: [errorEmbed] }).then(() => {
                    logger.debug(`Could not send Cases Message to ${message.author.tag}.\n`, error);
                    success = true;
                });
            }
        );

    
	}//end of command
}

module.exports.NewCommand = NewCommand;