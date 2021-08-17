const Discord = require('discord.js');
module.exports = {
  name: 'mrules ',
  description: 'The rule of the main BTE server',
  execute(message){
const Rules = new Discord.MessageEmbed()
.setColor('#00FFFF')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle (' Singapore Build The Earth Rules')
    .addFields( 
      { name: ":globe_with_meridians: 1. All forms of racism, sexism, homophobia, and other forms of prejudice are prohibited.", value: "Includes voice, text channels, direct messages, with no exceptions." },
      { name: ":underage: 2. Sending any attachment (video/image/link) that contains erotic/sexual content or gore is forbidden.", value: "— Suggestive/Minor NSFW in text, voice, emojis and reactions is also not allowed, but is taken more lightly." },
      { name: ":bank: 3. Talk of politics and other heavy topics is prohibited in all channels. ", value: "This is a server dedicated to the Build The Earth project alone, and we do not allow heavy or dividing topics to be discussed." },
      { name: ":hammer: 4. All aspects of Discord TOS must be followed (including but not limited to the age requirement of 13).", value: "Jokes about breaking TOS will be treated as facts. Read up here: \n https://discord.com/terms." },
      { name: ":desktop: 5. You are not allowed to play on a cracked account (an illegitimate Minecraft account).", value: "This is also the discussion or mention of cracked accounts or anything related to the topic.\n — This does not include launchers like MultiMc or Badlion as you require a legitimate Minecraft account to use them." },
      { name: "Rule #6 Finding Help", value: "Please DO NOT spam or cause any disruption, including mass pinging. If you require assistance, please create a support ticket with <@724495837325164576>" },
      { name: "Rule #7 Building Area", value: "Build within in your XX area, your build team's landmark or your own personal server (SIngapore has a server ping @StoneMc to start singapore server). If you build outside of your XX area, you may have to also claim it; or, if it's claimed, you may need to contact other builders to come to an agreement. You may also need to work together to build." },
      { name: "Rule #8 Interiors", value: "DO NOT build ANY INTERIORS of private buildings and properties. It causes an invasion of privacy and it may also save you some time locating blueprints of the building. The most you can do is a floor plan and ONLY the walls. Interior may be built in PUBLIC areas with high volume of visitors.\n Please consult any higher ranked staff if you are still unsure." },
      { name: "Rule #9 Publications", value: "ALL progress within our claimed areas belongs to Singapore BTE and will be kept strictly private and confidential. Authorisation of publication in any form such as pictures or descriptions of our progress must be sought from higher ranked staff, this includes sending ALL upcoming publications for vetting.\nALL publications must credited to this team, wherever appropriate." },
      { name: "Rule #10 Griefing", value: "DO NOT GRIEF. This includes destruction of buildings, roads, markings or causing disturbance to the surrounding builds. Randomly placing blocks everywhere also counts." },
      )
   .setFooter( 'Rules last updated on 13/3/2021','https://cdn.discordapp.com/embed/avatars/0.png%27');
   message.channel.send(Rules);
}
}
