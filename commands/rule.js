const Discord = require('discord.js');
module.exports = {
  name: 'rule',
  description: 'The rule of SG BTE',
  execute(message){
const Rules = new Discord.MessageEmbed()
.setColor('#00FFFF')
.setAuthor(`${message.author.username}`, `${message.author.displayAvatarURL({ dynamic: true })}`)
.setTitle (' Our server rules')
    .addFields( 
      { name: "Rule #1 Respect:", value: "Please treat everyone with respect. \nToxicity, racism, impersonation, prejudice or any other negative points are disallowed in this community. " },
      { name: "Rule #2 Discussion", value: "Discussions of heavy topics such as politics are not allowed in this community. We highly encourage discussions related to Singapore BTE." },
      { name: "Rule #3 Content or Language", value: "NSFW, explicit and provocative content or language are strictly forbidden in this community. Examples include pictures, links, videos, emojis, reactions and usernames. This also includes suggestive content or language." },
      { name: "Rule #4 Discord's Terms of Service", value: "Follow the Discord's Terms of Service to keep you out of trouble.\n Do not ACT like you're underage, it will seem suspicious." },
      { name: "Rule #5 Channels", value: "Use the channels for it's intended purposes. Do not, for example, use #progress-images for your usual chatting." },
      { name: "Rule #6 Finding Help", value: "Please DO NOT spam or cause any disruption, including mass pinging. If you require assistance, please create a support ticket with <@724495837325164576>" },
      { name: "Rule #7 Building Area", value: "Build within in your XX area, your build team's landmark or your own personal server (SIngapore has a server ping @StoneMc to start singapore server). If you build outside of your XX area, you may have to also claim it; or, if it's claimed, you may need to contact other builders to come to an agreement. You may also need to work together to build." },
      { name: "Rule #8 Interiors", value: "DO NOT build ANY INTERIORS of private buildings and properties. It causes an invasion of privacy and it may also save you some time locating blueprints of the building. The most you can do is a floor plan and ONLY the walls. Interior may be built in PUBLIC areas with high volume of visitors.\n Please consult any higher ranked staff if you are still unsure." },
      { name: "Rule #9 Publications", value: "ALL progress within our claimed areas belongs to Singapore BTE and will be kept strictly private and confidential. Authorization of publication in any form such as pictures or descriptions of our progress must be sought from higher ranked staff, this includes sending ALL upcoming publications for vetting.\nALL publications must credited to this team, wherever appropriate." },
      { name: "Rule #10 Griefing", value: "DO NOT GRIEF. This includes destruction of buildings, roads, markings or causing disturbance to the surrounding builds. Randomly placing blocks everywhere also counts." },
      )
   .setFooter( 'Rules last updated on 13/3/2021','https://cdn.discordapp.com/embed/avatars/0.png%27');
   message.channel.send(Rules);
}
}

//pog comment