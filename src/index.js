/* * * * * * * * * * * * * * * * * * * * * * * * *\
 *
 * FileName     :   index.js
 * Author       :   Association of Southeast Asian Nations Build The Earth
 * CreateTime   :   15-5-2021 
 * Organization :   https://github.com/ASEAN-Build-The-Earth
 * Description  :   Merlion discord bot core file
 * FileType     :   JS File
 *
\* * * * * * * * * * * * * * * * * * * * * * * * */
require('./lib/setup.js');
const { LogLevel, SapphireClient } = require("@sapphire/framework");
const { prefix } = require("./data/config.json");
const { token } = require("./data/auth.json");
const { join } = require('path');

const client = new SapphireClient(
	{
		defaultPrefix: prefix,
		regexPrefix: /^(hey +)?bot[,! ]/i,
		caseInsensitiveCommands: false,
		logger: {
			level: LogLevel.Debug
		},
		shards: 'auto',
		intents: [
			'GUILDS',
			'GUILD_MEMBERS',
			'GUILD_BANS',
			'GUILD_EMOJIS_AND_STICKERS',
			'GUILD_VOICE_STATES',
			'GUILD_MESSAGES',
			'GUILD_MESSAGE_REACTIONS',
			'DIRECT_MESSAGES',
			'DIRECT_MESSAGE_REACTIONS'
		],
		baseUserDirectory: __dirname,
	}
);


const main = async () => {
	try 
    {
		client.logger.info('Logging in. . .');
		client.stores.get('commands').registerPath(join(__dirname, '..', 'commands\\'));

		await client.login(token);
	}
    catch (error) 
    {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

process.on('warning', (warning) => 
{
    console.log(warning.stack);
});

main();
