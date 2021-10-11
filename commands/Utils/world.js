module.exports = {
    name: 'world',
    description: 'There is no world download',
    aliases: ['world'],
    execute(message, args) {
        message.channel.send('https://media.discordapp.net/attachments/727971398525648998/814636458160947270/download.png');
    },
};