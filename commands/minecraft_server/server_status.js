const { send, get } = require("@sapphire/plugin-editable-commands");
const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');

const axios = require('axios');
const Discord = require('discord.js');

class NewCommand extends SubCommandPluginCommand {
	constructor(context, options) {
		super(context, {
            ...options,
			aliases: ["server", "srv", "ssrv"],
			description: "Asean bte minecraft server commands",
			subCommands: [
                /**advaliable commands:
                 * <prefix>server status - tell base server status
                 * <prefix>server raw - give raw json data of server
                 * <prefix>server online - tell if server online or not
                 * <prefix>server ip - tell server ip
                 */
                { input: "status", default: true },
                { input: "stat", output: "status" }, 
                { input: "stats", output: "status" },
                { input: "info", output: "status" },
                "raw", 
                { input: "data", output: "raw" },
                { input: "json", output: "raw" },
                { input: "rawinfo", output: "raw" },
                { input: "rawdata", output: "raw" },
                { input: "rawstatus", output: "raw" },
                "online",
                { input: "down", output: "online" },
                { input: "online?", output: "online" },
                { input: "down?", output: "online" },
                "ip"
            ],
            cooldownDelay: 5000
		});
	}

	async status(message) 
    {
        let success = false;
        const temp = new Discord.MessageEmbed()
        .setColor("#b3b3ff")
        .setDescription("*grabbing status. . .*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });

        setTimeout(() => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor("#ff1a1a") // red
                .setDescription("*sorry, cant grab status*");
            // send error if takes too long to respons
            if(success) return;
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);

        axios.get("https://mcapi.us/server/status?ip=asean.my.to")
        .then(async response => 
        {
            let online = response.data.online ? true : false;

            const statusEmbed = new Discord.MessageEmbed()
            .setColor(online ? "#42f560" : "#949494")
            .setThumbnail("https://raw.githubusercontent.com/ASEAN-Build-The-Earth/AseanBTE-Website/main/Assets/Images/icons/aseanbte_logo.gif")
            .setTitle("asean.my.to | minecraft server")
            .addFields(
                { name: "status", value: `└─ ${online ? "online :white_check_mark:" : "offline :warning: "}` },
                { name: "players:", value: `└─ ${response.data.players.now} / ${response.data.players.max}`, inline: true },
                { name: "server", value: `└─ ${response.data.server.name}`, inline: true },
            )
            .setFooter((new Date()).toUTCString());
            return get(message).edit({ embeds: [statusEmbed] }).then(() => { success = true; });
        });
	}//end of status command

    async raw(message)
    {
        let success = false;
        const temp = new Discord.MessageEmbed()
        .setColor("#b3b3ff")
        .setDescription("*grabbing data. . .*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });
        
        setTimeout(() => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor("#ff1a1a") // red
                .setDescription("*sorry, cant grab status*");
            // send error if takes too long to respons
            if(success) return;
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);

        axios.get("https://mcapi.us/server/status?ip=asean.my.to")
        .then(async response => 
        {
            const statusEmbed = new Discord.MessageEmbed()
            .setAuthor("asean.my.to", "https://raw.githubusercontent.com/ASEAN-Build-The-Earth/AseanBTE-Website/main/Assets/Images/icons/aseanbte_logo.gif"/*, [website link] */)
            .setColor("#949494")
            .addFields(
                { 
                    name: "raw content:",
                    value: 
                      `\`\`\`json\n`
                    + `${JSON.stringify(response.data, 0, 4)}`
                    + `\n\`\`\`` 
                },
            )
            .setFooter((new Date()).toUTCString());
            return get(message).edit({ embeds: [statusEmbed] }).then(() => { success = true; });
        });
    }//end of raw command

    async online(message)
    {
        let success = false;
        const temp = new Discord.MessageEmbed()
        .setColor("#b3b3ff")
        .setDescription("*grabbing status. . .*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });

        setTimeout(() => {
            const errorEmbed = new Discord.MessageEmbed()
                .setColor("#ff1a1a") // red
                .setDescription("*sorry, cant grab status*");
            // send error if takes too long to respons
            if(success) return;
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);

        
        axios.get("https://mcapi.us/server/status?ip=asean.my.to")
        .then(async response => 
        {   
            let online = response.data.online ? true : false;
            const statusEmbed = new Discord.MessageEmbed()
            .setAuthor("asean.my.to", "https://raw.githubusercontent.com/ASEAN-Build-The-Earth/AseanBTE-Website/main/Assets/Images/icons/aseanbte_logo.gif"/*, [website link] */)
            .setColor(online ? "#42f560" : "#949494")
            .setTitle(`Server is ${online ? "online" : "offline"}`)
            .setFooter((new Date()).toUTCString());

            // edit the embed with grabbed joke
            return get(message).edit({ embeds: [statusEmbed] }).then(() => { success = true; });
        });
    }//end of online command

    async ip(message)
    {
        return send(message, "asean.my.to");
    }//end of ip command
}

module.exports.NewCommand = NewCommand;