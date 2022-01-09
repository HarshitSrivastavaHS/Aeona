const afkConfig = require('../Schemas/afk');
const mongo = require(`../mongo`);
const Discord = require("discord.js")
const fetch = require("node-fetch");
async function handleBotResponse(message,prefix){
  var i=0;
  while(i<3){
    i++;
  var replyFetch=await fetch(`https://DumBotApi.deepsarda.repl.co?key=${process.env.apiKey}&text=${message.content.slice(prefix.length).trim()}&userid=${message.author.id}`);
  var reply=await replyFetch.text()
  console.log("Guild: "+message.guild.name+"\n"+" Channel: "+message.channel.name+"\n User: "+message.author.username+"\n Message: "+message.content+"\n Reply: "+reply)
  if(reply=="") return;
  if(!reply.toLowerCase().includes("html")){
    await message.reply({content:reply,allowedMentions: {
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
    
	  serverprefix = bot.serverConfig.get(message.guild.id)!=undefined?bot.serverConfig.get(message.guild.id).prefix:undefined;
    if (!serverprefix) serverprefix = "+";

    var prefixes=[serverprefix,"+",">","aeona",`<@!${bot.user.id}>`,`<@${bot.user.id}>`]
		if (message.author.bot&&!bot.allowedBots.includes(message.author.id)) return;

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
    if (Math.floor(Math.random() * 100) ==3) {
       prefixFound=true;
    }
    if(!prefixFound) return;
    if (!message.content.toLowerCase().startsWith(prefix)) return;
    
    var args = message.content.slice(prefix.length).split(/ +/);
    args = args.filter(e=>e)
    const command = args.length > 0?args.shift().toLowerCase():undefined;
    
    let cmdexe = bot.commands.get(command)?bot.commands.get(command).command:undefined || bot.commands.find(c=>c.aliases&&c.aliases.includes(command))?bot.commands.find(c=>c.aliases&&c.aliases.includes(command)).command: undefined;

    if (message.author.bot&&!bot.allowedCommands.includes(cmdexe.name)) return;
  
    if(cmdexe==undefined) return handleBotResponse(message,prefix);

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
