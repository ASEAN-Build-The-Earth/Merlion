const { Command } = require("@sapphire/framework");
const { MessageEmbed }= require('discord.js');
const { SendEmbed } = require("#util/embed.js");

class AvatarCommand extends Command 
{
	constructor(context, options) 
    {
		super(context, {
			...options,
      		name: "avatar",
			aliases: ["profile", "pfp"],
			description: "get your own avatar picture or your friend's",
            detailedDescription: "this is so detailed",
            cooldownDelay: 5000
		});
	}

	async messageRun(message) {
        const pendingEmbed = new SendEmbed(message)
        await pendingEmbed.sendPendingEmbed("_inspecting . . ._", "_Sorry, failed to get an avatar picture_", { timeout: 10000 });
        
        /* check for mentioned user and get that user's avatar */
        const mentionMember = message.mentions.members.first(); 
        const mentionMemberAvatar = mentionMember? MentionMember.user.avatarURL({ format: 'png', size: 128}) : null;
        if(mentionMember !== undefined && mentionMemberAvatar !== null)
        {   
            const triggerEmbed = new MessageEmbed()
                .setTitle(`${mentionMember.user.username}#${mentionMember.user.discriminator}'s avatar`).setURL(mentionMemberAvatar)
                .setImage(mentionMemberAvatar)
                .setColor("#42f560");
            return pendingEmbed.resolve({ embeds: [triggerEmbed] });
        }

        /* get author's avatar if does not found mentioned user in the message */
        const authorAvatar = message.author.avatarURL({ format: 'png', size: 128});
        const triggerEmbed = new MessageEmbed()
            .setTitle(`${message.author.username}#${message.author.discriminator}'s avatar`).setURL(authorAvatar)
            .setImage(authorAvatar)
            .setColor("#42f560");
        return pendingEmbed.resolve({ embeds: [triggerEmbed] });
	}
}




module.exports.AvatarCommand = AvatarCommand;