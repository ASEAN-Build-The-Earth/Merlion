const axios = require('axios');
module.exports = {
    name: 'cat',
    description: 'USes an API to grab cat images ',
    execute(message, args) {
        axios.get('') //need to write this
        .then(response => {
          message.channel.send(JSON.stringify(response.data, 0, 4));
        });  
    },
};