const { Command } = require("@sapphire/framework");
const { MessageEmbed, MessageAttachment }= require('discord.js');
const { SendEmbed } = require("#util/embed.js");

class TriggerCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "triggered",
			aliases: ["trigger", "triggers"],
			description: "a description",
            detailedDescription: "this is so detailed",
            cooldownDelay: 10000 /* 10 secs cooldown */
		});
	}

	async messageRun(message) 
	{
        const { logger } = this.container;
        const pendingEmbed = new SendEmbed(message)
        await pendingEmbed.sendPendingEmbed("_triggerizing . . ._", "_Sorry, failed to trigger_", { pendingEmbedColor: "#ff1a1a" })

		// check if message did mention some user, will return unfefined if not mention anyone
        const MentionMember = message.mentions.members.first(); 
        // create avatar url to user depend on has user mentioned ? yes : no
        const MentionMemberAvatar = MentionMember? MentionMember.user.avatarURL({ format: 'png', size: 128}) : null;
        // Check if Mention user is exist or not, if exist, enter the block.
        if(MentionMember !== undefined && MentionMemberAvatar !== null)
        {
    // ==== Create message for Mentioned user in message =====
            const link = `https://some-random-api.ml/canvas/triggered/?avatar=${MentionMemberAvatar}`;

            const attachment = new MessageAttachment(link, 'triggered.gif');

            const triggerEmbed = new MessageEmbed()
                .setTitle('E')
                .setImage('attachment://triggered.gif')
                .setColor("#ff1a1a");

            logger.info(`[I] - Generating triggered meme for mentioned user: ${MentionMemberAvatar}\n`
            + `Generated Gif: https://some-random-api.ml/canvas/triggered?avatar=${MentionMemberAvatar}`);
            return pendingEmbed.resolve({ embeds: [triggerEmbed], files: [attachment]  });
        // * * * IF REACHED -> END OF FILE 
        }

    // ==== Create message for Author in message =====
        const authorAvatar = message.author.avatarURL({ format: 'png', size: 128});
        const link = `https://some-random-api.ml/canvas/triggered/?avatar=${authorAvatar}`;

        //create a message attachment with the name of the file with discord.js built in attachment class.
        const attachment = new MessageAttachment(link, 'triggered.gif');

        const triggerEmbed = new MessageEmbed()
            .setTitle('E')
            .setImage('attachment://triggered.gif')
            .setColor("#ff1a1a");

        logger.info(`[I] - Generating triggered meme for author: ${authorAvatar}\n`
        + `[I] - Generated Gif: https://some-random-api.ml/canvas/triggered?avatar=${authorAvatar}`);

        return pendingEmbed.resolve({ embeds: [triggerEmbed], files: [attachment] });
	}
}

module.exports.TriggerCommand = TriggerCommand;