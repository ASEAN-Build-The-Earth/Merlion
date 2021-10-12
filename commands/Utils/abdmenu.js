const Discord = require('discord.js');
module.exports = {
	name: 'menu',
	description: 'Dispalys amenu bmenu cmenu info',
	aliases: ['amenu'],
	execute(message, args) {
		const devtodo = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
		.setTitle (' amenu bmenu cmenu info')
			.addFields( 
			  { name: "Amenu ", value: " Like final ver least bugs" },
			  { name: "Bmenu", value: "Beta vers alot of bugs" },
			  { name: "Cmenu", value: "Dosnt Exist" },
			  { name: "TINmenu", value: "Grabs dog images and stuff (Dosnt exist yet)" },
			)
		   .setFooter( 'Rerember this is manualy updated.');
		   message.channel.send({ embeds: [devtodo]});
		}
		}
	

