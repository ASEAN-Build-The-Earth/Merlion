const moment = require('moment');
module.exports = {
	name: 'time',
	description: 'tell you the time',
	execute(message){
		const date = moment().format('lll');
		message.channel.send(date)
	}
}