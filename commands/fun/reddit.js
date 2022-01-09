let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'reddit',
    type: 'fun',
    usage: '&{prefix}reddit <subreddit>',
    description: 'get a post from a subreddit',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        message.channel.sendTyping();
        const fetch = require("node-fetch");
        try {
            fetch(`http://meme-api.herokuapp.com/gimme/${args[0]}`).then((res)=>{
                return res.json()
            }).then ((data)=>{
               if(data.url){
                 if(data.nsfw){
                  if(message.channel.nsfw){
                const embed =  embedbuilder.createEmbedGenerator(message)
                    .setTitle(data.title)
                    .setURL(data.url)
                    .setImage(data.url);                    
                message.channel.send({embeds: [embed.embed]}).then(message => {
                  message.react("👍");
                  message.react("😐");
                  message.react("👎");
                  message.react("⭐");
                });
                 }
                 else{
                     const embed =  embedbuilder.createEmbedGenerator(message)
                    .setTitle("Sorry! Its NSFW")
                    .setImage("https://i.imgur.com/oe4iK5i.gif")
                    .setFooter("Try again in an NSFW channel");  
                    message.channel.send({embeds: [embed.embed]})   
                 }

                 }
                 else {
                   const embed =  embedbuilder.createEmbedGenerator(message)
                    .setTitle(data.title)
                    .setURL(data.url)
                    .setImage(data.url);                    
                message.channel.send({embeds: [embed.embed]}).then(message => {
                  message.react("👍");
                  message.react("😐");
                  message.react("👎");
                  message.react("⭐");
                });
                 }

               }
            })
        }
         catch(err){
                message.channel.send("💔 Something went wrong");
        }
    }
}
 
