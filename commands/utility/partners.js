let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'partners',
    type: 'info',
    usage: '&{prefix}partners',
    description: 'Shows all the partners.',
    aliases: ["partner", "partnership"],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
      const partners = [
        {
          name: "Garuda",
          linkName: "Bot Invite (Admin)",
          link: "https://discord.com/api/oauth2/authorize?client_id=777840690515279872&permissions=8&scope=applications.commands%20bot"
        }
      ];
      const partnershipEmbed = embedbuilder.createEmbedGenerator(message)
      .setTitle("Our Partners")
      for (let partner of partners) {
        partnershipEmbed.addField(`${partner.name}`, `[${partner.linkName}](${partner.link})`);
      }
      message.reply({embeds:[partnershipEmbed.embed]});
    }
}
