module.exports = {
    name: '8ball',
    description: 'random message',
    execute(message, args) {
        if (!args[0]) {
            message.reply("Please input a question!")
        } else {
            var groceries = [
                'yes.',
                'no.',
                'yes definitely.',
                'you may rely on it.',
                'without a doubt.',
                'signs point to yes.'
                'most likely.',
                'ask again later.',
                'cannot predict now.',
                'very doubtful.',
                'my sources say no.',
                'dont count on it.',
                'outlook not so good.'
            ]
            let mygroceries = groceries[Math.floor(Math.random() * groceries.length)]
            message.reply('My opinion ' + mygroceries)
        }
    },
};
