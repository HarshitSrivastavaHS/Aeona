let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'snipe',
    type: 'utility',
    description: 'shows last deleted message in that channel',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {

      const channel = message.mentions.channels.first() || message.channel;
      
      let msg = bot.snipes.get(channel.id);

      if (!msg) return message.channel.send("There is no deleted message in this channel.");

      let snipeEmbed = embedbuilder.createEmbedGenerator(message)
      .setDescription(msg.content)
      .setImage(msg.image?msg.image:null)
      .setAuthor(msg.author, msg.avatar)
      .addField("Message Deleted on", `<t:${Math.floor(msg.time / 1000)}:f>`)

      message.channel.send({ embeds: [snipeEmbed.embed] });
    }
}
