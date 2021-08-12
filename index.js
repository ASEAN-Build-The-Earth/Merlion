

//index.js - Main file of ASEAN  discord bot
//Made by CookieGMVN, StoneMc
//version 0.2
const fs = require('fs');
const Discord = require('discord.js');
const { prefix, token } = require('./config.json');
const moment = require('moment');
const cron = require('cron');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var ip2 = 'asean.my.to';
const WOKCommands = require('wokcommands')
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
//cron

//
client.once("ready", () => {
  console.log(client.user.username + ' has started');
  //const date = moment().format('lll');
  //client.user.setActivity('Started at ' + date, {
  //type: "PLAYING",
  //});
});
//WOK slash commands


//more stuff
//function a(e){const i=require("https"),n="https://buildtheearth.net/buildteams/104/members";i.get(n+"?page=1",function(t){var d="";t.setEncoding("utf8"),t.on("data",function(e){d+=e}),t.on("end",function(){if(t=(t=(t=d.substring(d.indexOf('<div class="pagination">'))).substring(0,t.indexOf("</div>"))).match(/<a(.+)>(.+)<\/a>/g))for(var t=parseInt(t[t.length-1].match(/(\d+)(?!.*\d)/g)),a=1;a<t+1;a++)i.get(n+"?page="+a,function(i){var n="";i.setEncoding("utf8"),i.on("data",function(e){n+=e}),i.on("end",function(){var i=n.match(/<td>(.+)<\/td>/g);if(i){for(var t=1;t<i.length;t+=3){const n=i[t].replace(/<td>/g,"").replace(/<\/td>/g,"\n"),d=client.users.cache.find(e=>n.includes(e.username)),a=client.guilds.cache.get(e);if(void 0!==d&&a.member(d.id)){const e=a.roles.cache.find(e=>"Builders"===e.name),i=a.members.cache.get(d.id);i.roles.cache.has(e.id)||i.roles.add(e.id)}}i=void 0}}),n=void 0})}),d=void 0})}client.on("guildMemberAdd",e=>{a(e.guild.id)}),client.on("guildMemberUpdate",e=>{a(e.guild.id)});

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
//Status
function status(callback, ip) {
	var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'https://mcapi.us/server/status?ip='+ip2, true);
      ourRequest.onload = () => {
		var ourData = JSON.parse(ourRequest.responseText);
		callback(null, checkStatus(ourData));
    };
	ourRequest.onerror = function() {
  		console.error(ourRequest.statusText);
	};
    ourRequest.send();
}

function checkStatus(data){
	if(data.online){
		if (data.players.max === 0){
			return "The server is offline.";
		}
		else {
			return "The MC server is online, players currently online: " + data.players.now + " /" + data.players.max + " IP - asean.my.to";
		}

	} else {
		return "server offline";
	}
}


client.on('ready', () => {
	console.log('The bot in online');
});

client.on('message', message => {
	var args = message.content.split(/[ ]+/);
	if(message.content === 'm!hello'){
		message.reply('Hello there');
	}
	if(message.content === 'm!ServerStatus'){
			status((error, result) => {
				if (error) {
					message.channel.send("error!");
					return;
				}
			message.channel.send(result);
		}, ip2);
	}
});

  //event listener
  client.on('message', message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
  
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();
	
	  if (command === 'send'){
		if (!message.member.roles.cache.some(role => role.name === 'Staff')) return;
	
  
			  function getUserFromMention(mention) {
	  if (!mention) return;
	  if (mention.startsWith('<@') && mention.endsWith('>')) {
		  mention = mention.slice(2, -1);
		  if (mention.startsWith('!')) {
			  mention = mention.slice(1);
		  }
		  return mention;
	  }
  }
  const user = getUserFromMention(args[0])
  let MessageDM = args[1]
  client.users.cache.get(user).send(MessageDM);
	  }
  
  //cron jobs, send message hourly
	var CronJob = cron.CronJob;
  new CronJob('0 0 */1 * * *', function() {
			try {
			  const channel = client.channels.cache.get('820303612269953026');
			  channel.bulkDelete(1)
			  const date = moment().format('LLL'); 
				const Embed = new Discord.MessageEmbed()
	  .setColor('#00FFF')
	  .setTitle('ASEAN BTE')
	  .setImage('https://i.imgur.com/5DZueQQ.jpg')
	  .addFields(
		{ name: 'Total member:', value: `${message.guild.memberCount} `},
		{ name: 'Server name:', value: `${message.guild.name}` },
		{ name: 'Now time', value: date},
		)
	  .setFooter('Updated minuitely, now time is '+ date)
  channel.send(Embed)
			} catch (e) {
				console.log(e);
			}
		}, function() {},
		true
	);
  
	if (message.content === `${prefix}join`) {
	  client.emit('guildMemberAdd', message.member);
	}
	if (!client.commands.has(command)) return;
  
	try {
	  client.commands.get(command).execute(message, args);
	} catch (error) {
	  console.error(error);
	  message.reply('There was an error trying to execute that command!');
	}
  }); 
//simple hi auto resonder

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

			




client.login(token) //login to the bot use token from config.json








