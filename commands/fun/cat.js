let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'cat',
    type: 'fun',
    usage: '&{prefix}cat',
    description: 'get a random cat pic',
    aliases: [],
    permissions: ['SEND_MESSAGES', "EMBED_LINKS"],
    async execute(message, args, bot, Discord, prefix) {
        
        message.channel.sendTyping();
        const fetch = require("node-fetch");
        try {
            fetch(`http://aws.random.cat/meow`).then((res)=>{
                return res.json()
            }).then ((data)=>{
                const embed = embedbuilder.createEmbedGenerator(message)
                    .setFooter("A cute cat")
                    .setImage(`${data.file}`);                    
                message.channel.send({embeds:[embed.embed]});
            }).catch(err=>{
              message.channel.send("💔 Something went wrong");
            })
        }
         catch(err){
                message.channel.send("💔 Something went wrong");
        }
    }
}
