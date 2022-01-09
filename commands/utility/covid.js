let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'covid',
    type: 'info',
    usage: '&{prefix}covid',
    description: 'shows covid 19 stats',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        const code = args[0];
        const fetch = require("node-fetch");
        try {
            fetch(`https://disease.sh/v3/covid-19/all`).then((res)=>{
                return res.json()
            }).then ((data)=>{
                const covid = embedbuilder.createEmbedGenerator(message)
                    .setTitle('COVID-19 Stats')
                    .addFields(
                        { name: "Total Cases", value: `${data.cases}`, inline: true},
                        { name: "Active Cases", value: `${data.active}`, inline: true},
                        { name: "No. of Deaths", value: `${data.deaths}`, inline: true},
                        { name: "No. of People Recovered", value: `${data.recovered}`, inline: true}
                        )
                    .setFooter('via disease.sh')
                    .setThumbnail(`https://cdn.pixabay.com/photo/2020/04/29/07/54/coronavirus-5107715_1280.png`);
                message.channel.send({embeds:[covid.embed]});
            })
        }
        catch (err){
                message.channel.send(":broken-heart: Something went wrong");
        }
    }
}
