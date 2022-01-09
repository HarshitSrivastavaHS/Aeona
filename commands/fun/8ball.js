
const { SlashCommandBuilder } = require('@discordjs/builders');
let Discord = require("discord.js")
let embed1=require("../../util/embedBuilder.js")
const replies = ["It is certain.", "It is decidedly so.", "Without a doubt.", "Yes – definitely.", "You may rely on it.", "As I see it, yes.", "Most likely.", "Outlook good.", "Yes.", "Signs point to yes.", "Reply hazy, try again.", "Ask again later.", "Better not tell you now.", "Cannot predict now.", "Concentrate and ask again.", "Don't count on it.", "My reply is no.", "My sources say no.", "Outlook not so good.", "Very doubtful."];
module.exports = {
    name: '8ball',
    type: 'fun',
    usage: `&{prefix}8ball <question>`,
    description: 'ask yes/no question from the bot',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        if (args.length < 2) return message.channel.send({content: "Please ask a full question"});
        const opt = Math.floor(Math.random()*replies.length);
        let question = args.join(" ");
        question = question[0].toUpperCase()+question.substr(1, question.length);
        const embed = embed1.createEmbedGenerator(message)
        embed.setTitle(question)
        embed.setThumbnail("http://www.clipartbest.com/cliparts/aTq/x7p/aTqx7pLBc.png")
        embed.setDescription(`\`${replies[opt]}\``);
        message.channel.send({ content: "**:magic_wand: Magic 8 Ball :magic_wand:**", embeds: [embed.embed] });
    },
    slash: new SlashCommandBuilder()
	    .setName('8ball')
	    .setDescription('Ask questions from the magic 8ball!')
      .addStringOption(option =>
	    	option.setName('question')
			    .setDescription('Your Question')
          .setRequired(true))
      .addBooleanOption(option =>
	    	option.setName('private')
			    .setDescription('Visible only to you?')),
    async slashExecute(interaction) {
      let question = interaction.options.getString('question');
      question = question[0].toUpperCase()+question.substr(1, question.length);
      let opt = Math.floor(Math.random()*replies.length);
      const embed = embed1.createEmbedGenerator(message)
        .setTitle(question)
        .setThumbnail("http://www.clipartbest.com/cliparts/aTq/x7p/aTqx7pLBc.png")
        .setDescription(`\`${replies[opt]}\``);
      message.channel.send({ content: "**:magic_wand: Magic 8 Ball :magic_wand:**", embeds: [embed.embed] });
      let private = interaction.options.getBoolean("private")||false;
      interaction.reply({embeds: [embed.embed], ephemeral: private});
    }
}