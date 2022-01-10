const { ImgurClient } = require('imgur');
require("dotenv").config({ debug: process.env.DEBUG });
const { newuid } = require("../uniqueId.js");

const imgur  = new ImgurClient({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
});

async function uploadImage(url, title, description, callback) 
{
    imgur.upload(
        {
            image: url,
            name: title === null? `${description}_${newuid()}` : title,
            title: title === null? `${description}_${newuid()}` : title,
            description: title !== null? `${description}: ${title}` : description,
            album: process.env.ALBUM
        }
    ).then((result) => {
        console.log("generated new imgur image: ", result[0].data.link);
        return callback(result);
    }).catch((error) => {
        return console.log("error trying to save imgur image", error);
    });
}


module.exports.uploadImage = uploadImage;
