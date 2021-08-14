module.exports = {
	name: 'devtodo',
	description: 'There is no world download',
	aliases: ['dtd','DevToDo'],
	execute(message, args) {
		const devtodo = new Discord.MessageEmbed()
		.setColor('#00FF00')
		.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
		.setTitle ('Devs To Do list Currently!')
			.addFields( 
			  { name: "Add buttons", value: "Just buttons lol makes better help menus" },
			  { name: "Fix code structure?", value: "basically tidy up everything and fix typos" },
			  { name: "APIs", value: "add more support for APIs eg dog api and cat API" },
			)
		   .setFooter( 'Rerember this is manualy updated.');
		   message.channel.send(devtodo);
		}
		}
	

