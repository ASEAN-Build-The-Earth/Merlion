const { send, get } = require("@sapphire/plugin-editable-commands");
const { MessageEmbed } = require('discord.js');
const { container } = require('@sapphire/framework');

class SendEmbed {
    constructor(message, timeout = 5000 ) {
        this.message = message;
        this.promise = new Promise((resolve, reject)=> {
            this.reject = reject
            this.resolve = resolve

            setTimeout( () => {
                const timedOutEmbed = new MessageEmbed()
                    .setColor("#b3b3ff")
                    .setDescription("*Sorry, can't think of any joke.*");
                reject(timedOutEmbed)
            }, timeout)
        });

       
        this.promise.then(function(result) {// resolve
            return get(message).edit({ embeds: [result] }); 
        }).catch(rejection => {// reject
            container.logger.warn(`[E] - ${rejection.error.message} | to: ${message.author.username}[${message.author.id}]`, rejection.error.data);
            return get(message).edit({ embeds: [rejection.errorEmbed] });
        })
    }

    async sendPendingEmbed(description, embedColor = "#b3b3ff") {
        const pendingEmbed = new MessageEmbed()
            .setColor(embedColor)
            .setDescription(description);
        await send(this.message, { embeds: [pendingEmbed] });
    }
}

module.exports.SendEmbed = SendEmbed;