const axios = require('axios');
const countries = require("../../countries.json");
module.exports = {
    name: "cases",
    execute(message, args) {
        if (args.length > 2) return message.reply("Too many arguments...")
        if (args.length <= 1) return message.reply("Not enough arguments")
        axios.get(`https://api.covid19api.com/total/country/${args[1]}`)
            .then(response => {
                message.reply(`Confirmed: ${response.data.Confirmed},
                Deaths: ${response.data.Deaths}, 
                Recovered: ${response.data.Recovered}, 
                Active: ${response.data.Active}`)
            })
    }
}