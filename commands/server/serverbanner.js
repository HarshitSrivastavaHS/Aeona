let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'server-banner',
    description: 'shows the server banner, if it has one.',
    usage: "&{prefix}server-banner",
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    aliases: ["serverbanner", "sb"],
    async execute(message, args, bot, Discord, prefix) {
        if (!message.guild.banner)
            return message.channel.send("This server has no banner.");
        const embed = embedbuilder.createEmbedGenerator(message)
        .setImage(`${message.guild.bannerURL({size: 4096, dynamic: true})}`)
        .setTitle(`${message.guild.name}'s Banner`);
        message.channel.send({embeds:[embed]});
    }
}
