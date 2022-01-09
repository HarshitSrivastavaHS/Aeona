let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'fox',
    type: 'fun',
    usage: '&{prefix}fox',
    description: 'get a random fox pic',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        
        message.channel.sendTyping();
        const fetch = require("node-fetch");
        try {
            fetch(`https://some-random-api.ml/img/fox`).then((res)=>{
                return res.json()
            }).then ((data)=>{
                const embed = embedbuilder.createEmbedGenerator(message)

                    .setFooter("A cute fox")
                    .setImage(`${data.link}`);                    
                message.channel.send({embeds:[embed.embed]});
            }).catch(err=>{message.channel.send("💔 Something went wrong");})
        }
         catch(err){
                message.channel.send("💔 Something went wrong");
        }

    }
}
 
