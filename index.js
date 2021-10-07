//index.js - Main file of ASEAN  discord bot
//Made by CookieGMVN, StoneMc, dirtytin
//version 0.2
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();


	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


//covid count code test
const axios = require('axios');
const countries = require("./countries.json");
const url = 'https://api.covid19api.com/total/country/';
const WAKE_COMMAND = '/cases';
client.on('message', async (msg) => {
  const content = msg.content.split(/[ ,]+/);
  if(content[0] === WAKE_COMMAND){
    if(content.length > 2){
      msg.reply("Too many arguments...")
    }
    else if(content.length === 1){
      msg.reply("Not enough arguments")
    }
    else if(!countries[content[1]]){
      msg.reply("Wrong country format")
    }
    else{
      const slug = content[1]
      const payload = await axios.get(`${url}${slug}`)
      const covidData = payload.data.pop();
      msg.reply(`Confirmed: ${covidData.Confirmed}, Deaths: ${covidData.Deaths}, Recovered: ${covidData.Recovered}, Active: ${covidData.Active} `)
    }
  }
});
//All the autoresponders

client.on('message', message => {
if (message.content === 'Hi') {
	message.channel.send('Hi :)');
}
});
client.on('message', message => {
	if (message.content === 'hi') {
		message.channel.send('Hi :)');
	}
	});
client.on('message', message => {
        if (message.content === 'xbox') {
                message.channel.send('Is Sus');
        }
        });
client.on('message', message => {
        if (message.content === 'Phats') {
                message.channel.send('https://media.discordapp.net/attachments/832603438285062164/869838594859237418/render_2021-07-21_15.32.09.gif');
        }
        });
client.on('message', message => {
        if (message.content === 'How to join') {
                message.channel.send('Please read <#789012857798000690>');
        }
        });
client.on('message', message => {
  if (message.content === 'How do i join') {
          message.channel.send('Please read <#789012857798000690>');
  }
  });
			






client.login(token) //login to the bot use token from config.json








