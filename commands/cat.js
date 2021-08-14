const axios = require('axios');
module.exports = {
    name: 'cat',
    description: 'USes an API to grab cat images ',
    execute(message, args) {
        axios.get('https://api.thecatapi.com/v1/images/search') 
        .then(async response => {
          await message.channel.send("Image: "+ response.data[0].url);
          console.log(response.data.url);
        });  
    },
};


axios.get('https://api.thecatapi.com/v1/images/search') 
.then(response => {
  console.log(response.data);
});  