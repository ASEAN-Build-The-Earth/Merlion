const { send, get } = require("@sapphire/plugin-editable-commands");
const { MessageEmbed } = require('discord.js');
const { container } = require('@sapphire/framework');

/**
 * Embed Promise class, 
 * send pending embed while waiting for promise embed as resolve or reject
 * @class SendEmbed
 * @param {*} message embed's origin message to track (command's message object)
 */
class SendEmbed {
    constructor(message) {
        this.message = message;
        this.promise = new Promise((resolve, reject) => {
            /**
             * Reject the embed processing
             * @param {Object.<MessageEmbed, Object>} reject Rejection object containing embed and error object.
             * @param {MessageEmbed} reject.embed reject embed that will be display as a failed command.
             * @param {Object.<string, any>} reject.error error object, reason of rejection containing message and data.
             * @param {String} reject.error.message error description that will log in console.
             * @param {any} reject.error.data error stacktrace data, either by api or stacktrace from catch method.
             * @returns error embed display to user and a warning log on console.
             */
            this.reject = reject;
            /**
             * Resolve the embed processing
             * @param {MessageEmbed} embed final embed that will be sent to user and mark the embed as resolved.
             * @returns embed sent to user
             */
            this.resolve = resolve;
        }) /* Embed promise resolver */
        .then(function(result) {// resolve
            try { return get(message).edit({ embeds: [result] }); } 
            catch { return send(message, { embeds: [result] }); }
        })
        .catch(function({embed, error}) {// reject
            container.logger.warn(`[E] - ${error.message} | to: ${message.author.username}[${message.author.id}]`
                + `${error.data !== undefined? `\ndata: ${error.data}` : ""}`);
            try { return get(message).edit({ embeds: [embed] }); } 
            catch { return send(message, { embeds: [embed] }); }
        })
    }

    /**
     * Send a pending embed by class's message waiting for resolve/reject call.
     * @param {String} pendingMessage Pending message that will display in embed while waiting for resolve promise.
     * @param {String} timedOutMessage Timed out message that will display on embed if does not get response within timeout time.
     * @param {Object.<any>} options optional optional for appearence
     * @param {String} options.pendingEmbedColor embed color of pending message,  
     * @param {String} options.timedOutEmbedColor embed color of timed out message,  
     * @param {Number} options.timeout timeout length in milliseconds (default to 5000)
     */
    async sendPendingEmbed(pendingMessage, timedOutMessage, options) 
    {
        const pendingEmbedColor = !!options.pendingEmbedColor? options.pendingEmbedColor : "#b3b3ff";
        const timedOutEmbedColor = !!options.timedOutEmbedColor? options.timedOutEmbedColor : "#b3b3ff";
        const timeout = !!options.timeout? options.timeout : 5000;

        const pendingEmbed = new MessageEmbed().setColor(pendingEmbedColor).setDescription(pendingMessage);
        await send(this.message, { embeds: [pendingEmbed] });
        setTimeout( () => {
            const timedOutEmbed = new MessageEmbed().setColor(timedOutEmbedColor).setDescription(timedOutMessage);
            this.reject({embed: timedOutEmbed, error: { message: "embed timed out" }})
        }, timeout)
    }

}

module.exports.SendEmbed = SendEmbed;