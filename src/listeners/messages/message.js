const { Listener, Events } = require("@sapphire/framework");

class MessageCreateEvent extends Listener 
{
    constructor(context) 
    {
        super(context, { event: Events.MessageCreateEvent });
    }

    async run(message) 
    {
        
        const { client } = this.container;

        if (!message.content || !message.guild || !message.deletable) return;

        const matches = message.content.matchAll(/discord(?:(?:app)?\.com\/invite|\.gg(?:\/invite)?)\/([\w-]{2,255})/gis);

        for (const match of matches) 
        {
            const invite = await client.invites.fetch(match[1]).catch((e) => {});

            if (!invite) return;
            if (invite.guild?.id === message.guild.id) return;

            message.delete({ reason: "Invite Filter" });
            break;
        }
        
    }
}

module.exports = MessageCreateEvent;