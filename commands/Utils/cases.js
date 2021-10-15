module.exports = {
    name: "cases",
    execute(message, args) {
        
        axios.get(`https://api.covid19api.com/total/country/${String(args[1])}`)
            .then(response => 
            {
                message.reply(`Confirmed: ${response.data.Confirmed},
                Deaths: ${response.data.Deaths}, 
                Recovered: ${response.data.Recovered}, 
                Active: ${response.data.Active}`)
            }
        ).catch(error => 
            {
                console.error(`Could not send Cases DM to ${message.author.tag}.\n`, error);
                message.reply(`Error found: https://api.covid19api.com/total/country/${args[1]} \n` +  `\`\`\`\n` 
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