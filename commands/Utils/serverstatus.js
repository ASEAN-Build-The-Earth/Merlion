const axios = require('axios');
module.exports = {
    name: 'ssrv',
    aliases: ['apistatus'],
    description: 'Uses an API to grab server status ',
    execute(message, args) {
        axios.get('https://mcapi.us/server/status?ip=asean.my.to')
            .then(response => {
                message.channel.send(JSON.stringify(response.data, 0, 4));
            });
    },
};