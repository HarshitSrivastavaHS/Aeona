const mongo = require(`../../mongo`);
const user = require('../../Schemas/user');
let embedbuilder=require("../../util/embedBuilder.js");
var converter = require('number-to-words');
module.exports = {
    name: 'profile',
    usage: `&{prefix}profile [user]`,
    description: 'shows the user\'s profile',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        await message.guild.members.fetch();
      let mentionUser = message.mentions.members.first()&&message.mentions.members.filter(m=>args[0]&&args[0].includes(m.user.id)).size>=1?message.mentions.members.filter(m=>args[0]&&args[0].includes(m.user.id)).first():false|| message.guild.members.cache.get(args[0])|| args.length > 0 ? message.guild.members.cache.find(m => m.user.username.toLowerCase().includes(args.join(" ").toLowerCase())):false||message.member;
      
      mentionUser = await mentionUser.user.fetch(true);
       await user.findOne({_id:mentionUser.id},function (err, userprofile) {
        console.log(userprofile);
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        if(userprofile){
          var embed=embedbuilder.createEmbedGenerator(message).setAuthor(mentionUser.username, mentionUser.displayAvatarURL()).setTitle(mentionUser.username+" profile!").setDescription(mentionUser.username+" has said "+converter.toWords(Number(userprofile.words))+" words to Aeona!" );
          message.channel.send({ embeds: [embed.embed] });
        }else{
          message.channel.send("This user never talked to Aeona!")
        }
      });
      
      
    }
}