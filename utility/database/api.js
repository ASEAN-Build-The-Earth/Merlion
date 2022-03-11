const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApiSchema = new Schema(
    {
        type: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true 
    }
)

const Api = mongoose.model("Api", ApiSchema, "random_api")

async function getName(api, name, callback)
{
    api.find({ name: name })
    .then((data) => {
        callback(data);
    }).catch((error) => {
        console.log("error getting api name: ", error);
    });
}



module.exports.Api = Api;

module.exports.getName = getName;