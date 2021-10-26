/**
 * Used in: "../commands/fun/api_images/animals.js"
 */
const { send, get } = require("@sapphire/plugin-editable-commands");
const axios = require('axios');
const Discord = require('discord.js');

async function InitNewAnimalCommand(message, name, api, color)
{
    let success = false;
    const temp = new Discord.MessageEmbed()
    .setColor(color)
    .setDescription(`*thinking ${name}*`);
    // send await embed waiting for bot to grab api
    await send(message, { embeds: [temp] });

    setTimeout(() => {
        const errorEmbed = new Discord.MessageEmbed()
            .setColor("#ff1a1a") // red
            .setDescription(`*sorry, I cant think of any ${name}*`);

        if(success) return;
        // send error if takes too long to respons
        return get(message).edit({ embeds: [errorEmbed] });
    }, 10000/*10 secs*/);


    axios.get(api)
    .then(async response => {
        const animal = new Discord.MessageEmbed()
        .setColor(color)
        .setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
        .setTitle(`Here have a ${name} image`)
        .setImage(response.data.link)

        // edit the embed with grabbed joke
        return get(message).edit({ embeds: [animal] }).then(() => { success = true; });
    }).catch((error) => {
        console.log(`Could not send Cases Message to ${message.author.tag}.\n`, error);
    });
}

module.exports.InitNewAnimalCommand = InitNewAnimalCommand;