const afkConfig = require('../Schemas/afk');
const mongo = require(`../mongo`);
const Discord = require("discord.js")
const fetch = require("node-fetch");
let embedbuilder=require("../util/embedBuilder.js")
const user = require('../Schemas/user');
var converter = require('number-to-words');
const achivements=[50,100,500,1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,20000,20000,30000,40000,50000,60000,70000,80000,900000,200000,300000,400000,500000,600000,700000,800000,900000,1000000,2000000,3000000,4000000,5000000,6000000,7000000,8000000,9000000,10000000,20000000,30000000,40000000,50000000,60000000,70000000,80000000,90000000,100000000,200000000,300000000,400000000,500000000,600000000,700000000,800000000,900000000,1000000000]
async function handleBotResponse(message,prefix){
  let bot = message.client;
  serverprefix = bot.serverConfig.get(message.guild.id)!=undefined?bot.serverConfig.get(message.guild.id).prefix:undefined;
    if (!serverprefix) serverprefix = "+";

    var prefixes=[serverprefix,"+",">","aeona",`<@!${bot.user.id}>`,`<@${bot.user.id}>`]

  console.log("AI invoked");
  var url=`https://DumBotApi.deepsarda.repl.co?key=${process.env.apiKey}&text=${message.content.slice(prefix.length).trim()}&userid=${message.author.id}`
  console.log(url);
  var i=0;
  while(i<4){
    i++;
  var replyFetch=await fetch(url);
  var reply=await replyFetch.text()
 
  if(reply=="") reply="I did prefer not to answer :P";
  if(i==2){
    message.content="RANDOM";
  }
  let embeds=[];
  if (Math.floor(Math.random() * 50) < 5) {
    try{
          var embed= embedbuilder.createEmbedGenerator(message).setTitle("Help us grow by upvoting!").setDescription("[***Please upvote it helps a lot!***](https://top.gg/bot/870239976690970625)")
          embeds.push(embed)
    }catch(e){

    }

  }
  if(!reply.toLowerCase().includes("html")&&!reply.toLowerCase().includes("!!!!!")){
     console.log("Guild: "+message.guild.name+"\n"+" Channel: "+message.channel.name+"\n User: "+message.author.username+"\n Message: "+message.content+"\n Reply: "+reply)
    await message.reply({content:reply,embeds:embeds,allowedMentions: {
          repliedUser: false
      }})
    return;
  }

  }
}

module.exports = {
	name: 'messageCreate',
  async execute(message) {
    let bot = message.client;
    var prefix="";
    if(message.author.bot){
      return;
    }
	  serverprefix = bot.serverConfig.get(message.guild.id)!=undefined?bot.serverConfig.get(message.guild.id).prefix:undefined;
    if (!serverprefix) serverprefix = "+";

    var prefixes=[serverprefix,"+",">","aeona",`<@!${bot.user.id}>`,`<@${bot.user.id}>`]


    if (bot.afk.has(message.author.id)) {
      message.reply("Welcome back! I have cleared your AFK");
      bot.afk.delete(message.author.id);
	    await mongo().then(async (mongoose)=>{    
        await afkConfig.findOneAndRemove({
          _id: message.author.id
        })
      })
    }

    if (message.mentions.members.size>0) {
      let mentions = message.mentions.members;
      let arr = []
      mentions.forEach((item, index)=>{
        let mention = item;
        let afkStatus = bot.afk.get(mention.user.id);
        if (afkStatus)
          arr.push(`${mention.user.username} is AFK. Message: ${afkStatus.msg} - <t:${afkStatus.time}:R>`);
      })
      if (arr.length>0)
        message.channel.send(arr.join("\n"));
    }

    
    
    if (message.content.startsWith(`<@!${bot.user.id}>`)||message.content.startsWith(`<@${bot.user.id}>`)) {
      if (message.content.trim() == `<@!${bot.user.id}>` || message.content.trim() == `<@${bot.user.id}>`)
        return message.reply(`My prefix in this server is +. You can also ping me for running a command, eg: <@${bot.user.id}> help.`);
    }
    var prefixFound=false;
    for(pre in prefixes){
      pre=prefixes[pre]
      if(message.content.toLowerCase().trim().startsWith(pre)){
        prefixFound=true;
        prefix=pre;
        break;
      }
    }
    
    if (message.mentions.repliedUser){
      if(message.mentions.repliedUser.id==message.client.user.id){
         prefixFound=true;
      }
    }
    if (Math.floor(Math.random() * 100) ==5) {
       prefixFound=true;
    }
    if(!prefixFound) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    
    var args = message.content.slice(prefix.length).split(/ +/);
    args = args.filter(e=>e)
    const command = args.length > 0?args.shift().toLowerCase():undefined;
    
    let cmdexe = bot.commands.get(command)?bot.commands.get(command).command:undefined || bot.commands.find(c=>c.aliases&&c.aliases.includes(command))?bot.commands.find(c=>c.aliases&&c.aliases.includes(command)).command: undefined;

    if(cmdexe==undefined){ 
      var words=message.content.split(" ");
      await user.findOne({_id:message.author.id},function (err, userprofile) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        if(userprofile){
          var oldCount=userprofile.words;
          words=words.length+Number(userprofile.words)
          user.updateOne({ _id: message.author.id }, { words: ""+words }, function(err, res) {

          });
          var a=-1;
          for(var i=0;i<achivements.length;i++){
              if(achivements[i]>oldCount){
                a=i;
                i=1000;
              }
          }

          if(words>achivements[a]){
            var embed=embedbuilder.createEmbedGenerator(message);
            embed=embed.setTitle(" YAY!");
            embed=embed.setDescription(message.author.username+" has said "+converter.toWords(Number(words))+" words to Aeona!");
            message.channel.send({ embeds: [embed.embed] });
          }

          }else{
          user.create({ _id: message.author.id,words:""+words.length })
          }
          
         
      });
      return handleBotResponse(message,prefix);
    }

    let botPerms = [];
    let missingPerms = [];
    cmdexe.permissions.forEach(p=>{
      botPerms.push(message.channel.permissionsFor(bot.user).has(p));
      if (!(message.channel.permissionsFor(bot.user).has(p)))
        missingPerms.push(p);
    })
    missingPerms = missingPerms.join("\n");
    if (botPerms.includes(false)) return message.channel.send(`The Following permissions which are missing are needed by the bot for this command:\n\n\`\`\`\n${missingPerms.replace("_"," ")}\`\`\``).catch(err=>console.log(`Missing send message permission in a server.`));
    

    try {
      await cmdexe.execute(message, args, bot, Discord, prefix)
      console.log("Guild: "+message.guild.name+"\n"+" Channel: "+message.channel.name+"\n User: "+message.author.username+"\n Message: "+message.content)
    } catch (error) {
      console.error(error);
      await message.reply({ content: 'There was an error while executing this command! \n ***ERROR***:\n'+error});
    }



    if (Math.floor(Math.random() * 50) < 5) {
          bot.commands.get("partners").command.execute(message, [], bot, Discord, prefix);
    }
  },
};
