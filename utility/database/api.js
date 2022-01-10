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

module.exports = Api;