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
		caseInsensitiveCommands: true,
		defaultCooldown: {
			delay: 1000, // 1 secs default
			limit: 1
			/**more options 
			scope: BucketScope,
			filteredUsers: Snowflake[],
			filteredCommands: string[]
			*/
		},
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
		baseUserDirectory: __dirname
	}
);

//#region main() login function.
const main = async () => {
	try 
    {
		client.logger.info('Logging in. . .');
		// see: Notes[1]
		client.stores.get('commands').registerPath(join(__dirname, '..', 'commands'));

		await client.login(token);
	}
    catch (error) 
    {
		client.logger.fatal(error);
		client.destroy();
		process.exit(1);
	}
};

// Catch unecpected warning
process.on('warning', (warning) => 
{
    console.log(warning.stack);
});


main();
//#endregion main()

/**Notes[1]
 * By default, sapphire reads this folder structure
 * ```
 * /home/me/my-bot
 * ├─ src
 * │  ├─ commands
 * │  ├─ events
 * │  └─ index.js
 * └─ package.json
 * ```
 * We will change it to:
 * ```
 * /home/me/my-bot
 * ├─ commands
 * │
 * ├─ src
 * │  ├─ events
 * │  └─ index.js
 * └─ package.json
 * ```
 */ 
/**
 * Notes[2]: by default sapphire pick folder's exact name as command category.
 * ├─ commands
 * │  └─ fun
 * │      └─ uwu.js
 * └─ "uwu.js" now have category of ["fun"] by default.
 */

//#region ===== Auto Responser =====
// [Request]: a way to make messageCreate events out of this.
client.on('messageCreate', message => 
	{
		if (message.content === "<@850730172630302720>" || message.content === "<@!850730172630302720>") {
			message.reply(`Hi ${message.author}, My Prefix is \`${prefix}\`!`)
		}
		if (message.content.toLowerCase() === 'hi') {
			return message.reply('Hi :)');
		}
		if (message.content.toLowerCase() === 'xbox') {
			return message.reply('Is Sus');
		}
		if (message.content.toLowerCase() === 'phats') {
			return message.reply('https://media.discordapp.net/attachments/832603438285062164/869838594859237418/render_2021-07-21_15.32.09.gif');
		}
		if (message.content.toLowerCase() === 'how to join') {
			return message.reply('Please read <#789012857798000690>');
		}
		if (message.content.toLowerCase() === 'how do i join') {
			return message.reply('Please read <#789012857798000690>');
		}
		if (!message.content.startsWith(prefix)) return;
	}
);
//#endregion auto_response