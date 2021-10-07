module.exports = {
    name: 'ping',
    description: 'Pings the bot',
    aliases: ['ping'],
    execute(message, args) {
        message.reply('Pong.');
    },
};