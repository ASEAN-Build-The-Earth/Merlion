const { Command } = require("@sapphire/framework");
const { send, get } = require("@sapphire/plugin-editable-commands");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const Api = require("../../utility/database/api.js")
const available_type = ["shitpost", "animal", "food"]

//$addapi <category> <name(optional)>
class NewCommand extends Command {
	constructor(context, options) {
		super(context, {
			...options,
      		name: "addapi",
			aliases: ["urmom", "edrfgt"],
			description: "ping pong",
            cooldownDelay: 50000
		});
	}

	async messageRun(message, args) 
	{
        const { logger } = this.container;
        const argsContext = await args.parser.parserOutput.ordered;
        const temp = new MessageEmbed().setColor("#b3b3ff").setDescription("*registering your data*");

        await send(message, { embeds: [temp] }); // send await embed waiting for bot to grab api


        const registeredData = registerInput(message.attachments, argsContext[0], argsContext[1]); 
       
        const confirmEmbed = new MessageEmbed()
            .setColor("#ff8f00")
            .setTitle("Please confirm your data")
            .addField("type", `└─ ${registeredData.type}`, true)
            .addField("name", `└─ ${registeredData.name}`, true)
            .addField("attachment url:", `${registeredData.attachment}`, false)
            .setDescription("*be sure your data is correct!*")
            .setImage(registeredData.attachment);

        const api = new Api({
            type: registeredData.type,
            name: registeredData.name,
            url: registeredData.attachment
        });


        if(registeredData.error !== null)
        {
            const errorEmbed = new MessageEmbed().setColor("#ee0004").setDescription(registeredData.error);
            return get(message).edit({ embeds: [errorEmbed] });
        }
           
    //#region SETTING
        //build a button
        const uid = function() { // unique id generators
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        };  
        const id_yes = `new_api_confirm_${uid()}`;
        const id_no = `new_api_deny_${uid()}`;

        let buttonComponent = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setLabel("YES!")
                .setCustomId(id_yes) // custom ID to trigger button collector
                .setStyle("SUCCESS") // blurple style
        )
        .addComponents(
            new MessageButton()
                .setLabel("Hol up, NO!")
                .setCustomId(id_no) // custom ID to trigger button collector
                .setStyle("DANGER") // blurple style
        ); 
        
        // create button collector to listen to user's input
        const filter = i => i.customId === id_yes && i.user.id === message.author.id;
        const collector_yes = message.channel.createMessageComponentCollector({ filter, time: 60000 }); //adviable for 1 mins

        const filter_R = i => i.customId === id_no && i.user.id === message.author.id;
        const collector_no = message.channel.createMessageComponentCollector({ filter_R, time: 60000 }); //adviable for 30 mins


    //#endregion SETTING
        await get(message).edit({ embeds: [confirmEmbed], components: [buttonComponent] }); //pop up comfirm embed

        let confirmation = {
            confirmed: false,
            response: null,
            expired: false,
        }
    //#region RUNTIME
        collector_yes.on("collect", async i => 
        {
            if (i.customId === id_yes && confirmation.confirmed !== true) 
            {
                await i.deferUpdate();
                buttonComponent.components[0].setDisabled(true).setStyle("SECONDARY").setLabel("confirmed!");
                buttonComponent.components[1].setDisabled(true).setStyle("SECONDARY").setLabel("confirmed!");
                get(message).edit({ components: [buttonComponent] }).then(() => {
                    confirmation.confirmed = true;
                    confirmation.response = "yes"

                    saveApi(api, confirmation, i);
                });
            }
        });

        collector_no.on("collect", async i => 
        {
            if (i.customId === id_no && confirmation.confirmed !== true) 
            {
                await i.deferUpdate();
                buttonComponent.components[0].setDisabled(true).setStyle("SECONDARY").setLabel("confirmed!");
                buttonComponent.components[1].setDisabled(true).setStyle("SECONDARY").setLabel("confirmed!");
                get(message).edit({ components: [buttonComponent] }).then(() => {
                    confirmation.confirmed = true;
                    confirmation.response = "no"
                    
                    saveApi(api, confirmation, i);
                });
            }
        });

        collector_yes.on("end", collected => 
        {  // on button expire
            if(!confirmation.confirmed === true)
            {
                buttonComponent.components[0].setDisabled(true).setStyle("SECONDARY").setLabel("expired");
                buttonComponent.components[1].setDisabled(true).setStyle("SECONDARY").setLabel("expired");
            }
            logger.debug(`Collector has ended - Collected ${collected.size} items (id: ${id_yes})`);
            get(message).edit({ components: [buttonComponent] }).then(() => {
                confirmation.expired = true;
            });
        });

        collector_no.on("end", collected => 
        {  // on button expire
            if(!confirmation.confirmed === true)
            {
                buttonComponent.components[0].setDisabled(true).setStyle("SECONDARY").setLabel("expired");
                buttonComponent.components[1].setDisabled(true).setStyle("SECONDARY").setLabel("expired");
            }
            logger.debug(`Collector has ended - Collected ${collected.size} items (id: ${id_no})`);
            return get(message).edit({ components: [buttonComponent] }).then(() => {
                confirmation.expired = true;
            });
        });
    //#endregion RUNTIME
        
        
	}

    
}

function saveApi(api, comfirmation, message)
{
    let confirmationEmbed = new MessageEmbed()

    switch (comfirmation.response) 
    {
        case "yes":
        {
            api.save() // save the data to database
                .then((result) => {
                    console.log("saved new api: ", result);

                    confirmationEmbed.setDescription("saved!").setColor("#89eb34")
                    return send(message, {embeds: [confirmationEmbed]})
                }).catch((error) => {
                    console.log("error saving api: ", error);
                    confirmationEmbed.setDescription("error occured! please try again").setColor("#ee0004")
                    return send(message, {embeds: [confirmationEmbed]})
                });
            break;
        }
        case "no":
        {
            confirmationEmbed.setDescription("OK! cancelled").setColor("#89eb34");
            return send(message, {embeds: [confirmationEmbed]});
        }
    }
    
}

function registerInput(attachments, inputType, name)
{
    let f_error = null
    const f_inputType = inputType !== undefined? inputType.value : null;
    const f_name = name !== undefined? name.value : null
    let f_attachment = null;
    

    // filter
    if(attachments.size > 1) //only support 1 per message currently
    {   f_error = "Sorry, we only support 1 attachment per message"; }
    else if(attachments.size < 1)
    {   f_error = "Hey, what attachment you want to add to the api? plese sent it!"; }
    else if(f_inputType === null)
    {   f_error = "Hey, please specify category you wanted to add the attachment to out api! (`shitpost, animal, food`)"; }
    else if(!available_type.includes(f_inputType))
    {   f_error = "Hey, you can only input the category `shitpost, animal, food`"; }
    else
    {
        attachments.forEach(element => {
            f_attachment = element.url;
        });
    }


    const registeredData = {
        type: f_inputType,
        name: f_name,
        attachment: f_attachment,
        error: f_error,
    }

    return registeredData;
}


module.exports.NewCommand = NewCommand;
