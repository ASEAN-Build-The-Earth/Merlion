require("dotenv").config({ debug: process.env.DEBUG });
const { writeFile , readFileSync} = require('fs');
const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { container } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const memorizeFile = path.resolve(__dirname, "_server_status.json");
const SERVER_STATUS = String(`http://${process.env.CONTROL_PANEL_DOMAIN}/v1/network/servers`);
const FETCH_STATE = Object.freeze({ FETCHABLE: 1, MEMORIZED: 2 });
const SERVERS = Object.freeze({
    HUB: 1, 
    PLOT: 2, 
    MASTER: 3,
    SINGAPORE: 4,
    SMP: 5,
});
const getServerKey = (server) => { 
    const key = Object.keys(SERVERS).find(key => SERVERS[key] === server);
    if(key == "SMP") return key;
    return  key.charAt(0) + key.slice(1).toLowerCase();
}

class Memorizer {
    static memorize() {
        this.fetchState = FETCH_STATE.MEMORIZED;
        setTimeout(() => { this.fetchState = FETCH_STATE.FETCHABLE }, 300000) // 5 minutes
    }

    static state() {
        return this.fetchState === undefined? FETCH_STATE.FETCHABLE : this.fetchState;
    }
}
class ServerStatus {
    static get getStatus() {
        return new Promise((resolve, reject) => {
            switch(Memorizer.state()) {
                case FETCH_STATE.MEMORIZED: {
                    container.logger.info("[I] - serving memorized file");
                    const serverStatusData = readFileSync(memorizeFile, 'utf8');
                    if(serverStatusData !== "{}") resolve(JSON.parse(serverStatusData));
                    else reject("something went wrong while getting memorized server status data");
                    break;
                }

                case FETCH_STATE.FETCHABLE: {
                    fetch(SERVER_STATUS, FetchResultTypes.JSON)
                    .then(async (response) => {
                        container.logger.info("[I] - successfully fetch server plan api, status");
                        writeFile(memorizeFile, JSON.stringify(response), (err) => {
                            if (err) {
                                container.logger.debug("[E] - failed to save server status to json file, please check your file path, ", err);
                                return;
                            }
                            container.logger.info("[I] - succesfully saved server status data");
                            Memorizer.memorize();
                            resolve(JSON.parse(readFileSync(memorizeFile, 'utf8')));
                        });
                    })
                    .catch((error) => {
                        container.logger.info("[E] - failed to fetch server status api, ", error);
                    });
                }
            }
        });
    }
}

class MakeEmbed {
    static get(server, response) {
        const serverData = Object.values(response.servers).find((obj) => {
            switch(server) {
                case SERVERS.HUB: return obj.name == "The Hub"
                case SERVERS.PLOT: return obj.name == "PlotSystem"
                case SERVERS.MASTER: return obj.name == "Master Server (T++)"
                case SERVERS.SINGAPORE: return obj.name == "Singapore"
                case SERVERS.SMP: return obj.name == "Smp"
                default: return null;
            }
        });
        const statusEmbed = new MessageEmbed();
        if(server !== null) {
            const online = serverData.online === 0? true : false;

            statusEmbed
            .setColor(online? "#42f560" : "#949494")
            .setThumbnail("https://asean.buildtheearth.asia/media/icons/aseanbte_logo.gif")
            .setTitle(`${getServerKey(server)} Server | ASEAN BuildTheEarth`)
            .setDescription(`<t:${response.timestamp.toString().slice(0, 10)}:R>`)

            if(online) {
                statusEmbed.addFields(
                    { name: "status", value: "<:reply:960082754362564671> :green_circle: online" },
                    { name: "players", value:`<:reply:960082754362564671> ${serverData.playersOnline[serverData.playersOnline.length - 1][1]} / 20`, inline: true },
                    { name: "server", value: `<:reply:960082754362564671> ${getServerKey(server)}`, inline: true },
                    { name: "** **",
                    value: 
                        `\`\`\`yaml`
                        + `\nuptime: ${serverData.current_uptime}`
                        + `\ntps spike: ${serverData.low_tps_spikes}`
                        + `\naverage tps: ${serverData.avg_tps}`
                        + `\ntimestamp: ${response.timestamp_f}`
                        + `\n\`\`\``
                    }
                )
            } else {
                statusEmbed.addFields(
                    { name: "status", value: "<:reply:960082754362564671> :red_circle: offline" },
                    { name: "total downtime", value: `<:reply:960082754362564671> ${serverData.downtime}`, inline: true },
                    { name: "server", value: `<:reply:960082754362564671> ${getServerKey(server)}`, inline: true },
                )
            }
            
        }
        else {
            const serversStatus = []
            Object.values(response.servers).find((obj) => {
                switch(obj.name) {
                    case "The Hub": serversStatus[0] = { key: SERVERS.HUB, data: obj }; break;
                    case "PlotSystem": serversStatus[1] = { key: SERVERS.PLOT, data: obj }; break;
                    case "Master Server (T++)": serversStatus[2] = { key: SERVERS.MASTER, data: obj }; break;
                    case "Singapore": serversStatus[3] = { key: SERVERS.SINGAPORE, data: obj }; break;
                    case "Smp": serversStatus[4] = { key: SERVERS.SMP, data: obj }; break;
                }
            });
            let displayString = ""
            serversStatus.forEach((server) => {
                displayString += `\n${server.data.online === 0? `:green_circle:` : ":red_circle:"
                } **${getServerKey(server.key)} Server** (${server.data.online !== 0? 0 : server.data.playersOnline[server.data.playersOnline.length - 1][1]} / 20)`;
            })

            statusEmbed
            .setColor("#b3b3ff")
            .setThumbnail("https://asean.buildtheearth.asia/media/icons/aseanbte_logo.gif")
            .setTitle("139.99.91.188:25569 | ASEAN BuildTheEarth")
            .setDescription(displayString.concat(`\n<t:${response.timestamp.toString().slice(0, 10)}:R>`))
        }
        return statusEmbed;
    }

    static getJSON(server, response) {
        const serverData = Object.values(response.servers).find((obj) => {
            switch(server) {
                case SERVERS.HUB: return obj.name == "The Hub"
                case SERVERS.PLOT: return obj.name == "PlotSystem"
                case SERVERS.MASTER: return obj.name == "Master Server (T++)"
                case SERVERS.SINGAPORE: return obj.name == "Singapore"
                case SERVERS.SMP: return obj.name == "Smp"
                default: return null;
            }
        });
        const statusEmbed = new MessageEmbed();
        if(server !== null) {
            const online = serverData.online === 0? true : false;
            delete serverData.playersOnline; /* data too long */
            statusEmbed
            .setAuthor({name: `${getServerKey(server)} Server`,
                url: "https://asean.buildtheearth.asia",
                iconURL: "https://asean.buildtheearth.asia/media/icons/aseanbte_logo.gif",
            })
            .setColor(online? "#42f560" : "#949494")
            .addFields(
                { 
                    name: "raw content:",
                    value: 
                    `\`\`\`json\n`
                    + `${JSON.stringify(serverData, 0, 4)}`
                    + `\n\`\`\`` 
                },
            )
            .setDescription(`<t:${response.timestamp.toString().slice(0, 10)}:R>`);
        }
        else {
            statusEmbed.setTitle("Please specify server to check")
            .setColor("#949494")
            .setDescription("\`hub\`?, \`plot\`?, \`master\`?, \`smp\`?")
        }
        return statusEmbed;
    }

    static async ServerFilter(args) {
        const argsContext = await args.parser.parserOutput.ordered;
        const arg = argsContext.length === 1? argsContext[0].value : argsContext.length > 1? argsContext[1].value : "null";
        switch(arg.toLowerCase()) {
            case "hub": 
            case "lobby": return SERVERS.HUB;
            case "plot":
            case "plotsystem": return SERVERS.PLOT;
            case "master": 
            case "main":
            case "terraplusplus":
            case "t++": return SERVERS.MASTER;
            case "sg":
            case "singapore": return SERVERS.SINGAPORE;
            case "survival":
            case "smp": return SERVERS.SMP
            default: return null;
        }
    }
}

module.exports.ServerStatus = ServerStatus;
module.exports.MakeEmbed = MakeEmbed;