require("@sapphire/plugin-logger/register");
require("@sapphire/plugin-api/register");
require("@sapphire/plugin-editable-commands/register");


// connect to mongodb database
const mongoose = require("mongoose");
async function InitDatabase(url) {
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, keepAlive: true })
    .then((result) => console.log("connected to database: ", result.connections[0].host))
    .catch((error) => console.log("error occured connecting to database:\n", error));
}
module.exports.InitDatabase = InitDatabase;