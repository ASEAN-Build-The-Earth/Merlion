require("dotenv").config({ debug: process.env.DEBUG });

const { Command } = require("@sapphire/framework");
const { send, get } = require("@sapphire/plugin-editable-commands");
const axios = require('axios');
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { pickRandom } = require("../../utility/random");

class NewCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "bte",
            aliases: ["aseanbte", "asean-bte", "btebuild", "bte-build", "aseanbte-build", "aseanbtebuild"], 
			description: "Show on going project of asean bte",
            cooldownDelay: 30000
		});
	}

    /// [TODO] - unique ID for collector, currently collector can only be deploy once
    
	async messageRun(message) 
	{
    //#region DEPLOYMENT
        let deploySuccess = false;
        const { logger } = this.container;
        const temp = new MessageEmbed()
            .setColor("#b3b3ff")
            .setDescription("*grabbing your data*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });

        setTimeout(() => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("*sorry, I cant fetch my website*");
            // send error if takes too long to respons
            if(deploySuccess) return;
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);

    //#endregion DEPLOYMENT

    //#region SETTING
        //build a button
        const uid = function() { // unique id generators
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };  const id = `bte_api_${uid()}`;
        
        let displayEmbed = new MessageEmbed();
        let buttonComponent = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("more site")
                .setCustomId(id) // custom ID to trigger button collector
                .setStyle('PRIMARY') // blurple style
        ); 
        
        // create button collector to listen to user's input
        const filter = i => i.customId === id;
        const collector = message.channel.createMessageComponentCollector({ filter, time: 60000 }); //adviable for 1 mins
        let inProgress = false;
    //#endregion SETTING

    //#region RUNTIME
        
        collector.on("collect", async i => 
        {
            if (i.customId === id && !inProgress) 
            {
                inProgress = true;
                await i.deferUpdate();
                buttonComponent.components[0].setDisabled(true).setStyle("SECONDARY").setLabel("●●●");
                get(message).edit({ embeds: [fetchLoadingEmbed()], components: [buttonComponent] });
                
                
                fetchWebsite((response) => 
                {
                    buttonComponent.components[0].setDisabled(false).setStyle("PRIMARY").setLabel("more site");
                    displayEmbed = fetchNewSite(response.data.locations);
                    return get(message).edit({ embeds: [displayEmbed] })
                        .then(() => { // then add cooldown 2 seconds before making button work again(prevent spam)
                            setTimeout(() => { get(message).edit({ components: [buttonComponent] }); inProgress = false; }, 2000)  }); 
                });
                
            }
        });

        collector.on("end", collected => 
        {  // on button expire
            buttonComponent.components[0].setDisabled(true).setStyle("SECONDARY").setLabel("expired");
            logger.debug(`Collector has ended - Collected ${collected.size} items (id: ${id})`);
            return get(message).edit({ components: [buttonComponent] })
        });
        

        fetchWebsite((response) => // on embed deploy 
        {
            displayEmbed = fetchNewSite(response.data.locations);
            return get(message).edit({ embeds: [displayEmbed], components: [buttonComponent] }).then(() => { deploySuccess = true; });
        });
    //#endregion RUNTIME

        function fetchWebsite(callback) 
        {
            axios.get("https://buildtheearth.net/api/v1/locations", {
                headers: { // Authorize with api with admin token
                    Authorization: "Bearer " + process.env.BTE_WEBSITE_TOKEN 
                }
            })
            .then((response) => {
                callback(response);

            }).catch((error) => {
                logger.error("Could not send fetch bte website", error);
            });
        }

        function fetchNewSite(api_data)
        {
            let site = pickRandom(api_data)
            let hasNotes = ( site.note === "" ) ? false : true;

            let apiEmbed = new MessageEmbed()
                .setColor("#42f560")
                .setAuthor("Asean Build The Earth | Build sites")
                .setThumbnail("https://raw.githubusercontent.com/ASEAN-Build-The-Earth/AseanBTE-Website/main/Assets/Images/icons/aseanbte_logo.gif")
                .setTitle(site.name).setURL(`https://buildtheearth.net/locations/${site.id}`)
                .addFields(
                    { name: "regions owned", value: `└─ ${site.regions}`, inline: true },
                    { name: "expansion in pending", value: `└─ ${site.expansionPending ? "yes" : "none" }`, inline: true },
                )
                .setFooter((new Date()).toUTCString());
            if(hasNotes) apiEmbed.setDescription(site.note);
            return apiEmbed;
        }
        
        function fetchLoadingEmbed()
        {
            let loadingEmbed = new MessageEmbed()
                .setColor("#949494")
                .setAuthor("Asean Build The Earth | Build sites")
                .setThumbnail("https://raw.githubusercontent.com/ASEAN-Build-The-Earth/AseanBTE-Website/main/Assets/Images/icons/aseanbte_logo.gif")
                .setTitle(". . .")
                .addFields(
                    { name: "regions owned", value: "└─ . . .", inline: true },
                    { name: "expansion in pending", value: "└─ . . .", inline: true },
                )
                .setFooter(". . .");
            return loadingEmbed;
        }

        
        
	}//end of command
}

module.exports.NewCommand = NewCommand;