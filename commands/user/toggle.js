const mongo = require(`../../mongo`);
const user = require('../../Schemas/user');
let embedbuilder=require("../../util/embedBuilder.js");
var converter = require('number-to-words');
module.exports = {
    name: 'toggle',
    usage: `&{prefix}toggle`,
    description: 'disable auto replies',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
      
      await user.findOne({_id:message.author.id},function (err, userprofile) {
          if (err) return handleError(errundefined);
          if(userprofile){
            if(userprofile.toggle==null||userprofile.toggle==undefined){
              user.updateOne({ _id: message.author.id }, { toggle: "true" }, function(err, res) {       
              });
              message.channel.send("Aeona wont reply randomly to you!");
            }else{
              user.updateOne({ _id: message.author.id }, { toggle: undefined }, function(err, res) {       
              });
              message.channel.send("Aeona will reply randomly to you!");
            }
          }
        });
      
    }
}