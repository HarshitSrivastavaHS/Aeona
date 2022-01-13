let embedbuilder=require("../../util/embedBuilder.js")
const Tenor = require("tenorjs").client({
    "Key": "YOUR DEVELOPER KEY HERE", // https://tenor.com/developer/keyregistration
    "Filter": "off", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
    "MediaFilter": "minimal", // either minimal or basic, not case sensitive
    "DateFormat": "D/MM/YYYY - H:mm:ss A" // Change this accordingly
});

module.exports = {
    name: 'cuddle',
    type: 'fun',
    usage: '&{prefix}hug',
    description: 'cuddle a user!',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {

      await message.guild.members.fetch();
      let mentionUser = message.mentions.members.first()&&message.mentions.members.filter(m=>args[0]&&args[0].includes(m.user.id)).size>=1?message.mentions.members.filter(m=>args[0]&&args[0].includes(m.user.id)).first():false|| message.guild.members.cache.get(args[0])|| args.length > 0 ? message.guild.members.cache.find(m => m.user.username.toLowerCase().includes(args.join(" ").toLowerCase())):false||message.member;
      mentionUser = await mentionUser.user.fetch(true);

      Tenor.Search.Random("anime cuddle", "1").then(Results => {
            Results.forEach(Post => {
                  
                 var embed=embedbuilder.createEmbedGenerator(message).setTitle(message.author.username +" cuddles "+mentionUser.username).setDescription('Its cozy!');
                  const file = new Discord.MessageAttachment(Post.media[0].gif.url);
                  embed = embed.setImage(Post.media[0].gif.url);
                  message.channel.send({ embeds: [embed], files: [file] })
            });
      }).catch(console.error);
      
    }
}
 