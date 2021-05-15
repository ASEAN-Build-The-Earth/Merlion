
module.exports = {
	name: 'purge',
	description: 'Delete your bruh chat',
	args: true,
	execute(message, args){
        if (message.member.roles.cache.some(role => role.name === 'Support')) {
         if (!args[0])
         {
             message.channel.send('Please input a interger!')
         }
         else
         {
             message.channel.bulkDelete(args[0])
         .then(messages => message.channel.send(`Deleted ${messages.size} messages.`))
       .catch(console.error)
      setTimeout(() => {  message.channel.bulkDelete(1); }, 1000);
        }
         }
        else {
            message.channel.send('Missing perms..')
        }
}
}
