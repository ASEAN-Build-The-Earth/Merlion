require("dotenv").config({ debug: process.env.DEBUG });
const { writeFile , readFileSync} = require('fs');
const { fetch, FetchResultTypes } = require('@sapphire/fetch');
const { container } = require('@sapphire/framework');
const { MessageEmbed } = require('discord.js');
const path = require('path');
const memorizeFile = path.resolve(__dirname, "_server_status.json");
const SERVER_STATUS = String(`https://${process.env.CONTROL_PANEL_DOMAIN}/api/v1/server_stats`);
const FETCH_STATE = Object.freeze({ FETCHABLE: 1, MEMORIZED: 2 });
const SERVERS = Object.freeze({
    HUB: 1, 
    PLOT: 2, 
    MASTER: 3,
    PROXY: 4,
});
const getServerKey = (server) => { 
    const key = Object.keys(SERVERS).find(key => SERVERS[key] === server);
    return  key.charAt(0) + key.slice(1).toLowerCase();
}

class Memorizer {
    static memorize() {
        this.fetchState = FETCH_STATE.MEMORIZED;
        setTimeout(() => { this.fetchState = FETCH_STATE.FETCHABLE }, 180000) // 3 minutes
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
                    fetch(SERVER_STATUS.concat("?token=" + process.env.CRAFTY_API_TOKEN), FetchResultTypes.JSON)
                    .then(async (response) => {
                        container.logger.info("[I] - successfully fetch crafty server api, status:", response.status);
                        response.fetch_time = `${(new Date()).toUTCString()}`
                        writeFile(memorizeFile, JSON.stringify(response), (err) => {
                            if (err) {
                                container.logger.info("[E] - failed to save server status to json file, please check your file path, ", err);
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
        const serverData = Object.values(response.data).find((obj) => {
            switch(server) {
                case SERVERS.HUB: return obj.name == "HUB"
                case SERVERS.PLOT: return obj.name == "PLOT SYSTEM"
                case SERVERS.MASTER: return obj.name == "ASEAN BTE Main"
                case SERVERS.PROXY: return obj.name == "Proxy"
                default: return null;
            }
        });
        const statusEmbed = new MessageEmbed();
        if(server !== null) {
            statusEmbed
            .setColor(serverData.server_running? "#42f560" : "#949494")
            .setThumbnail("https://builders-doc.netlify.app/media/icons/aseanbte_logo.gif")
            .setTitle("139.99.91.188:25569 | ASEAN BuildTheEarth")
            .addFields(
                { name: "status", value: `└─ ${serverData.server_running? ":green_circle: online" : ":red_circle: offline"}` },
                { name: "players", value:`└─ ${serverData.online_players} / ${serverData.max_players}`, inline: true },
                { name: "server", value: `└─ ${getServerKey(server)}`, inline: true },
                { name: "** **",
                value: 
                    `\`\`\`yaml`
                    + `\nmemory usage: ${serverData.memory_usage}`
                    + `\ncpu usage: ${serverData.cpu_usage}`
                    + `\nstarted since: ${serverData.server_start_time}`
                    + `\n\`\`\``
                }
            )
            .setFooter({ text: response.fetch_time });
        }
        else {
            const serversStatus = []
            Object.values(response.data).find((obj) => {
                switch(obj.name) {
                    case "HUB": serversStatus[0] = { key: SERVERS.HUB, data: obj }; break;
                    case "PLOT SYSTEM": serversStatus[1] = { key: SERVERS.PLOT, data: obj }; break;
                    case "ASEAN BTE Main": serversStatus[2] = { key: SERVERS.MASTER, data: obj }; break;
                    case "Proxy": serversStatus[3] = { key: SERVERS.PROXY, data: obj }; break;
                }
            });
            let displayString = ""
            serversStatus.forEach((server) => {
                displayString += `\n${server.data.server_running? `:green_circle:` : ":red_circle:"
                } **${getServerKey(server.key)} Server** (${server.data.online_players} / ${server.data.max_players})`;
            })

            statusEmbed
            .setColor("#b3b3ff")
            .setThumbnail("https://builders-doc.netlify.app/media/icons/aseanbte_logo.gif")
            .setTitle("139.99.91.188:25569 | ASEAN BuildTheEarth")
            .setDescription(displayString)
            .setFooter({ text: response.fetch_time });
        }
        return statusEmbed;
    }

    static getJSON(server, response) {
        const serverData = Object.values(response.data).find((obj) => {
            switch(server) {
                case SERVERS.HUB: return obj.name == "HUB"
                case SERVERS.PLOT: return obj.name == "PLOT SYSTEM"
                case SERVERS.MASTER: return obj.name == "ASEAN BTE Main"
                case SERVERS.PROXY: return obj.name == "Proxy"
                default: return null;
            }
        });
        const statusEmbed = new MessageEmbed();
        if(server !== null) {
            statusEmbed
            .setAuthor({name: "139.99.91.188:25568",
                url: "https://builders-doc.netlify.app",
                iconURL: "https://builders-doc.netlify.app/media/icons/aseanbte_logo.gif",
            })
            .setColor(serverData.server_running? "#42f560" : "#949494")
            .addFields(
                { 
                    name: "raw content:",
                    value: 
                    `\`\`\`json\n`
                    + `${JSON.stringify(serverData, 0, 4)}`
                    + `\n\`\`\`` 
                },
            )
            .setFooter({ text: response.fetch_time });
        }
        else {
            statusEmbed.setTitle("Please specify server to check")
            .setColor("#949494")
            .setDescription("\`hub\`?, \`plot\`?, \`master\`?, \`proxy\`?")
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
            case "proxy": return SERVERS.PROXY
            default: return null;
        }
    }
}

module.exports.ServerStatus = ServerStatus;
module.exports.MakeEmbed = MakeEmbed;