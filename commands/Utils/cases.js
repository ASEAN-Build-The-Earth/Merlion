const axios = require('axios');
module.exports = {
    name: "cases",
    execute(message, args) {
        
        axios.get(`https://api.covid19api.com/total/country/${String(args[0])}`)
            .then(response => 
            {

                message.reply(`Data: https://api.covid19api.com/total/country/${String(args[0])}
                Confirmed: ${response.data[response.data.length - 1].Confirmed},
                Deaths: ${response.data[response.data.length - 1].Deaths}, 
                Recovered: ${response.data[response.data.length - 1].Recovered}, 
                Active: ${response.data[response.data.length - 1].Active}`)
                
            }
        ).catch(error => 
            {
                console.error(`Could not send Cases DM to ${message.author.tag}.\n`, error);
                message.reply(`Error found: https://api.covid19api.com/total/country/${String(args[0])} \n` +  `\`\`\`\n` 
                + error + "\n" 
                + error.response.data  + "\n" 
                + error.response.status + "\n" 
                + error.response.headers + "\n" 
                + `\`\`\`\n`);
                // message.reply('it seems like I can\'t DM you!');
            }
            
        );
    }
}