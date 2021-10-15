const axios = require('axios')
module.exports = {
    name: "cases",
    execute(message, args) {
        if (args.length > 2) return message.reply("Too many arguments...")
        if (args.length <= 1) return message.reply("Not enough arguments")
        axios.get(`https://api.covid19api.com/total/country/${args[1]}`)
            .then(response => {
                console.log(response.data);
            })
    }}