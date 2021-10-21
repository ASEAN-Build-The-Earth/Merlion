const Discord = require('discord.js');
module.exports = {
    name: 'menu',
    description: 'Displays amenu bmenu cmenu info',
    aliases: ['amenu'],
    execute(message, args) {
        const devtodo = new Discord.MessageEmbed()
            .setColor('#00FF00')
            .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .setTitle('amenu bmenu cmenu info')
            .addFields({ name: "Amenu ", value: "Like final ver least bugs" }, { name: "Bmenu", value: "Beta ver a lot of bugs" }, { name: "Cmenu", value: "Doesn't exist" }, { name: "TINmenu", value: "Grabs dog images and stuff (Doesn't exist yet)" }, )
            .setFooter('Remember this is manually updated.');
        message.channel.send({ embeds: [devtodo] });
    }
}
