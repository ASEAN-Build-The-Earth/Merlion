const { Command } = require("@sapphire/framework");
const { send, get } = require("@sapphire/plugin-editable-commands");
const { MessageEmbed, MessageAttachment }= require('discord.js');

class NewCommand extends Command 
{
	constructor(context, options) 
    {
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
        let success = false;
        const temp = new MessageEmbed()
            .setColor("#ff1a1a")
            .setDescription("*triggerizing . . .*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });
        


        setTimeout(() => {
            const errorEmbed = new MessageEmbed()
                .setColor("#ff1a1a") // red
                .setDescription("*sorry, I cant be triggered*");

            if(success) return;
            // send error if takes too long to response
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);
            


		// check if message did mention some user, will return unfefined if not mention anyone
        let MentionMember = message.mentions.members.first(); 
        // create avatar url to user depend on has user mentioned ? yes : no
        let MentionMemberAvatar = MentionMember? MentionMember.user.avatarURL({ format: 'png', size: 128}) : null;
        // Check if Mention user is exist or not, if exist, enter the block.
        if(MentionMember !== undefined && MentionMemberAvatar !== null)
        {
    // ==== Create message for Mentioned user in message =====
            let link = `https://some-random-api.ml/canvas/triggered/?avatar=${MentionMemberAvatar}`;

            let attachment = new MessageAttachment(link, 'triggered.gif');

            const triggerEmbed = new MessageEmbed()
                .setTitle('E')
                .setImage('attachment://triggered.gif')
                .setColor("#ff1a1a");

            logger.debug(`Generating triggered meme for mentioned user: ${MentionMemberAvatar}\n`
            + `Generated Gif: https://some-random-api.ml/canvas/triggered?avatar=${MentionMemberAvatar}`);

            return get(message).edit({ embeds: [triggerEmbed], files: [attachment]  }).then(() => { success = true; });
        // * * * IF REACHED -> END OF FILE 
        }

    // ==== Create message for Author in message =====
        let authorAvatar = message.author.avatarURL({ format: 'png', size: 128});
        let link = `https://some-random-api.ml/canvas/triggered/?avatar=${authorAvatar}`;

        //create a message attachment with the name of the file with discord.js built in attachment class.
        let attachment = new MessageAttachment(link, 'triggered.gif');

        const triggerEmbed = new MessageEmbed()
            .setTitle('E')
            .setImage('attachment://triggered.gif')
            .setColor("#ff1a1a");

        logger.debug(`Generating triggered meme for author: ${authorAvatar}\n`
        + `Generated Gif: https://some-random-api.ml/canvas/triggered?avatar=${authorAvatar}`);

        return get(message).edit({ embeds: [triggerEmbed], files: [attachment]  }).then(() => { success = true; });
	} // end of commands
}




module.exports.NewCommand = NewCommand;