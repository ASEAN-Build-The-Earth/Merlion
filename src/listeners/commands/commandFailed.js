const { Listener, Events } = require("@sapphire/framework");

class CommandFailedEvent extends Listener 
{
    constructor(context) 
    {
        super(context, { event: Events.CommandError });
    }

    async run(error, { message }) 
    {
       return message.channel.send({content: `Something went wrong. The problem: \`${error.message.replaceAll("\n", " ")}\``});
    }
}

module.exports = CommandFailedEvent;