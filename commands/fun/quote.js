const fetch = require("node-fetch");
let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'quote',
    usage: '&{prefix}quote',
    description: 'get a random quote',
    aliases: ["thought", "quotes"],
    permissions: ['SEND_MESSAGES'],
    async execute(message, args, bot, Discord, prefix) {
        
        message.channel.sendTyping();
        try {
            const response = await fetch('https://inspirobot.me/api?generate=true');
            const body = await response.text();
            const embed =embedbuilder.createEmbedGenerator(message)
            .setImage(body)
            .setTitle(`Heres a quote for you!`);
            message.channel.send({embeds:[embed]});
        }
         catch(err){
                message.channel.send("💔 Something went wrong");
        }

    }
}
