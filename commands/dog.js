const axios = require('axios');
module.exports = {
    name: 'dog',
    description: 'USes an API to grab cat images ',
    execute(message, args) {
        axios.get('https://dog.ceo/api/breeds/image/random') 
        .then(async response => {
          await message.channel.send("Image: "+ response.data.message);
          console.log(response.data.message);
        });  
    },
};


axios.get('https://dog.ceo/api/breeds/image/random') 
.then(response => {
  console.log(response.data);
});  