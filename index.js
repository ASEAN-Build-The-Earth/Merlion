//index.js - Main file of ASEAN  discord bot
//Made by Association of Southeast Asian Nations Build The Earth
//version BETA v0.3.2
//Phats is cool
//Turtle
const fs = require('fs');
const { Client, Intents, Collection } = require('discord.js');
const { prefix } = require('./data/config.json');
const { token } = require("./data/auth.json")

const client = new Client({
    intents: [
            Intents.FLAGS.DIRECT_MESSAGES,
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_BANS,
            Intents.FLAGS.GUILD_MEMBERS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_WEBHOOKS,
            Intents.FLAGS.GUILD_VOICE_STATES
        ] //,
        //partials: ["CHANNEL"]
});
client.commands = new Collection();

const commandFolders = fs.readdirSync('./commands');
for (const folder of commandFolders) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}


client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity(`YOU`, {
        type: "WATCHING",
    });
});


//All the autoresponders

client.on('messageCreate', message => {
    if (message.content === "<@850730172630302720>" || message.content === "<@!850730172630302720>") {
        message.reply(`Hi ${message.author}, My Prefix is \`${prefix}\`!`)
    }
    if (message.content.toLowerCase() === 'hi') {
        return message.reply('Hi :)');
    }
    if (message.content.toLowerCase() === 'xbox') {
        return message.reply('Is Sus');
    }
    if (message.content.toLowerCase() === 'phats') {
        return message.reply('https://media.discordapp.net/attachments/832603438285062164/869838594859237418/render_2021-07-21_15.32.09.gif');
    }
    if (message.content.toLowerCase() === 'how to join') {
        return message.reply('Please read <#789012857798000690>');
    }
    if (message.content.toLowerCase() === 'how do i join') {
        return message.reply('Please read <#789012857798000690>');
    }
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();
    const command = client.commands.get(commandName) ||
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        return command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        const ErrorEmbed = new Discord.MessageEmbed()
            .setColor("#ffb7c5")
            .setAuthor(`${message.author.tag}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
            .addFields({ name: "ERR!", value: "Oops! I can't execute this command!" }, );
        return message.reply({ embeds: [ErrorEmbed] });
    }
});

client.login(token)
