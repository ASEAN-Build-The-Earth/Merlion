module.exports = {
	name: '8ball',
	description: 'random message',
	execute(message, args) {
		if(!args[0]){
			message.channel.send("Please input a question!")
			}
			else{
		var groceries = [
'yes',
'no',
]
let mygroceries = groceries[Math.floor(Math.random() * groceries.length)]
message.channel.send('I think ' + mygroceries)
}
	},
};