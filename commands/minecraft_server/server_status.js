const { SubCommandPluginCommand } = require('@sapphire/plugin-subcommands');
const { MessageEmbed } = require('discord.js');
const { send } = require("@sapphire/plugin-editable-commands");
const { SendEmbed } = require("#util/embed.js");
const { ServerStatus, MakeEmbed } = require("#util/server_status/internal.js");

class ServerStatusCommand extends SubCommandPluginCommand {
	constructor(context, options) {
		super(context, {
            ...options,
			aliases: ["server", "srv", "ssrv"],
			description: "ASEAN BTE minecraft server commands",
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
                "ip"
            ],
            cooldownDelay: 0
		});
	}

    

	async status(message, args) 
    {
        const pendingEmbed = new SendEmbed(message)
        await pendingEmbed.sendPendingEmbed("_grabbing status. . ._", "_Sorry, failed to get server status_", { timeout: 10000 })
        const server = await MakeEmbed.ServerFilter(args);
        ServerStatus.getStatus.then(async (response) => {
            const statusEmbed = MakeEmbed.get(server, response);
            pendingEmbed.resolve(statusEmbed);
        })
        .catch((error) => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("_Sorry, unable to get data_");
            pendingEmbed.reject({embed: errorEmbed, error: { data: error, message:"failed to fetch server status api" }})
        });
	}

    async raw(message, args)
    {
        const pendingEmbed = new SendEmbed(message)
        await pendingEmbed.sendPendingEmbed("_grabbing status. . ._", "_Sorry, failed to get server status_", { timeout: 10000 });
        const server = await MakeEmbed.ServerFilter(args);
        ServerStatus.getStatus.then(async (response) => {
            const statusEmbed = MakeEmbed.getJSON(server, response);
            pendingEmbed.resolve(statusEmbed);
        })
        .catch((error) => {
            const errorEmbed = new MessageEmbed().setColor("#ff1a1a").setDescription("_Sorry, unable to get data_");
            pendingEmbed.reject({embed: errorEmbed, error: { data: error, message:"failed to fetch server status api" }})
        });
    }

    async ip(message)
    {
        const statusEmbed = new MessageEmbed()
        .setAuthor({name: "Server IP",
            url: "https://builders-doc.netlify.app",
            iconURL: "https://builders-doc.netlify.app/media/icons/aseanbte_logo.gif",
        })
        .setColor("#42f560")
        .addFields(
            { name: "Java Edition", value: "> **IP**: \n> \`\`\`shell\n> 139.99.91.188:25569\n> \`\`\`" },
            { name: "Bedrock Edition", value: "> **IP**: \n> \`\`\`shell\n> 139.99.91.188\n> \`\`\`\n> **PORT**: \n> \`\`\`\n> 19132\n> \`\`\`" }
        )
        return send(message, {embeds: [statusEmbed]});
    }
}

module.exports.ServerStatusCommand = ServerStatusCommand;