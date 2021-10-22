const Discord = require('discord.js');

module.exports = {
    name: 'triggered',
    description: 'Uses an API to manipulate the triggered meme gif',

    execute(message, args) 
    {
        // check if message did mention some user, will return unfefined if not mention anyone
        let MentionMember = message.mentions.members.first(); 
        // create avatar url to user depend on has user mentioned ? yes : no
        let MentionMemberAvatar = MentionMember? MentionMember.user.avatarURL({ format: 'png', size: 128}) : null;
        // Check if Mention user is exist or not, if exist, enter the block.
        if(MentionMember !== undefined && MentionMemberAvatar !== null)
        {
    // ==== Create message for Mentioned user in message =====
            let link = `https://some-random-api.ml/canvas/triggered/?avatar=${MentionMemberAvatar}`;

            let attachment = new Discord.MessageAttachment(link, 'triggered.gif');

            const embed = new Discord.MessageEmbed()
                .setTitle('E')
                .setImage('attachment://triggered.gif')
                .setColor("#ff1a1a");

            console.log("!Triggered command: triggered ->\n"
            + `Generating triggered meme for mentioned user: ${MentionMemberAvatar}\n`
            + `Generated Gif: https://some-random-api.ml/canvas/triggered?avatar=${MentionMemberAvatar}`);

            message.channel.send({ embeds: [embed], files: [attachment] });
        // * * * IF REACHED -> END OF FILE 
            return; 
        }

    // ==== Create message for Author in message =====
        let authorAvatar = message.author.avatarURL({ format: 'png', size: 128});
        let link = `https://some-random-api.ml/canvas/triggered/?avatar=${authorAvatar}`;

        //create a message attachment with the name of the file with discord.js built in attachment class.
        let attachment = new Discord.MessageAttachment(link, 'triggered.gif');

        const embed = new Discord.MessageEmbed()
            .setTitle('E')
            .setImage('attachment://triggered.gif')
            .setColor("#ff1a1a");

        console.log("!Triggered command: triggered ->\n"
        + `Generating triggered meme for author: ${authorAvatar}\n`
        + `Generated Gif: https://some-random-api.ml/canvas/triggered?avatar=${authorAvatar}`);

        message.channel.send({ embeds: [embed], files: [attachment] });
    }
};
