let embedbuilder=require("../../util/embedBuilder.js")
const Discord = require("discord.js")
const {SlashCommandBuilder} = require("@discordjs/builders")
function getEm(bot,message){
  const em =   embedbuilder.createEmbedGenerator(message)
    .setTitle("Want to add me to your server? Use the link below!")
    .addFields({
      name: "**Invite me**", value: "**[Click here to invite](https://discord.com/api/oauth2/authorize?client_id=931226824753700934&permissions=8&scope=bot%20applications.commands)**"
    })
  return em;
}
      
module.exports = {
    name: 'invite',
    usage: '&{prefix}invite',
    description: 'gives bot\'s invite link',
    aliases: ["inv"],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        let em = getEm(bot,message);
        message.channel.send({embeds:[em]});
    },
    slash: new SlashCommandBuilder()
      .setName("invite")
      .setDescription("Get bot's invite"),
    slashExecute(interaction) {
      interaction.reply({embeds:[getEm(interaction.client,interaction)]});
    }
}