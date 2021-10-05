
const axios = require('axios');
// axios.get('https://mcapi.us/server/status?ip=asean.my.to')
// .then(response => {
//   console.log(response.data);
// });

module.exports = {
    name: 'ssrv',
    description: 'USes an API to grab server status ',
    execute(message, args) {
        axios.get('https://mcapi.us/server/status?ip=asean.my.to')
        .then(response => {
          message.channel.send(JSON.stringify(response.data, 0, 4));
          console.log(response.data);
        });  
    },
};
