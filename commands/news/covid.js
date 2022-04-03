const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { Command } = require("@sapphire/framework");
const { SendEmbed } = require("#util/embed.js");
const { MessageEmbed } = require('discord.js');

class CovidCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "covid",
            aliases: ["cases", "case", "corona"],
			description: "Uses an API to covid data",
            cooldownDelay: 10000
		});
	}

	async messageRun(message, args) 
	{
        const pendingEmbed = new SendEmbed(message);
        await pendingEmbed.sendPendingEmbed("_grabbing data_", "_Sorry, unable to get data._", { timeout: 10000 })
        
        const argsContext = args.parser.parserOutput.ordered;
        if(argsContext[0] === undefined) {   
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("*this command needed an arguments*");
            pendingEmbed.reject({embed: errorEmbed, error: { message:"command out of argument" }})
            return;
        }
        // Advaliable countries: https://github.com/disease-sh/API/blob/master/utils/countries.js
        // generated link for grabbing data
        const generatedLink = `https://disease.sh/v3/covid-19/countries/${String(argsContext[0].value)}`;
        // shorterned link for printing text only(reduce word size)
        const shortLink = `disease.sh/v3/covid-19/countries/${String(argsContext[0].value)}`      
        
        fetch(generatedLink, FetchResultTypes.JSON)
        .then(async (response) => {
            const covidEmbed = new MessageEmbed()
            .setColor("#A8542D")
            .setTitle("COVID-19 statistics").setURL("https://disease.sh")
            .setDescription(`*data: [${shortLink}](${generatedLink})*`)
            .setThumbnail(`${response.countryInfo.flag}`)
                .addFields(
                { name: 'Total cases:', value: `${response.cases}`},
                { name: 'Total cases reported today:', value: `${response.todayCases}`, inline: true},
                { name: 'Total deaths:', value: `${response.deaths}`},
                { name: 'Total deaths reported today:', value: `${response.todayDeaths}`, inline: true },
                { name: 'Total recoveries:', value: `${response.recovered}`},
                { name: 'Total recoveries reported today:', value: `${response.todayRecovered}`, inline: true},
                { name: 'Active cases:', value: `${response.active}`},
                {name: 'Critical cases:', value: `${response.critical}`, inline: true},)
            .setFooter({text: "disease.sh - Open Disease Data API"});
            pendingEmbed.resolve({ embeds: [covidEmbed] });
        })
        .catch((error) => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("*Sorry, I cant grab your data.* (*" + `[${shortLink}](${generatedLink})*)`);
            pendingEmbed.reject({embed: errorEmbed, error: { data: error, message:"failed to fetch joke api" }})
        });
	}
}

module.exports.CovidCommand = CovidCommand;