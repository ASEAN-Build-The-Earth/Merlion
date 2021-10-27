const { send } = require("@sapphire/plugin-editable-commands");
const { MessageEmbed } = require("discord.js");
const { RandomLoadingMessage } = require("./constants.js");

function pickRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function pickRandomObject(array) {
	objectLenght = Object.keys(array).length;
	return array[Math.floor(Math.random() * objectLenght)];
}

function sendLoadingMessage(message) {
	return send(message, { embeds: [new MessageEmbed().setDescription(pickRandom(RandomLoadingMessage)).setColor('#FF0000')] });
}

module.exports.pickRandom = pickRandom;
module.exports.sendLoadingMessage = sendLoadingMessage;
module.exports.pickRandomObject = pickRandomObject;