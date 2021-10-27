const { Command } = require("@sapphire/framework");
const { send, get } = require("@sapphire/plugin-editable-commands");
const { MessageEmbed }= require('discord.js');

class NewCommand extends Command 
{
	constructor(context, options) 
    {
		super(context, {
			...options,
      		name: "avatar",
			aliases: ["profile", "pfp"],
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
            .setColor("#949494")
            .setDescription("*memorizing your avatar . . .*");
        // send await embed waiting for bot to grab api
        await send(message, { embeds: [temp] });
        


        setTimeout(() => {
            const errorEmbed = new MessageEmbed()
                .setColor("#ff1a1a") // red
                .setDescription("*sorry, I cant remember your avatar*");

            if(success) return;
            // send error if takes too long to response
            return get(message).edit({ embeds: [errorEmbed] });
        }, 10000/*10 secs*/);
            
		// check if message did mention some user, will return unfefined if not mention anyone
        let MentionMember = message.mentions.members.first(); 
        let MentionMemberAvatar = MentionMember? MentionMember.user.avatarURL({ format: 'png', size: 128}) : null;
        if(MentionMember !== undefined && MentionMemberAvatar !== null)
        {   
            const triggerEmbed = new MessageEmbed()
                .setTitle(`${MentionMember.user.username}#${MentionMember.user.discriminator}'s avatar`).setURL(MentionMemberAvatar)
                .setImage(MentionMemberAvatar)
                .setColor("#42f560");

                logger.debug(MentionMember.user.username);
            return get(message).edit({ embeds: [triggerEmbed] }).then(() => { success = true; });
        }

    // ==== Create message for Author in message =====
        let authorAvatar = message.author.avatarURL({ format: 'png', size: 128});

        const triggerEmbed = new MessageEmbed()
            .setTitle(`${message.author.username}#${message.author.discriminator}'s avatar`).setURL(authorAvatar)
            .setImage(authorAvatar)
            .setColor("#42f560");

        return get(message).edit({ embeds: [triggerEmbed] }).then(() => { success = true; });
	} // end of commands
}




module.exports.NewCommand = NewCommand;