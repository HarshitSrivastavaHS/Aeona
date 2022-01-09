let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: "unlock",
    type: 'moderation',
    usage: '&{prefix}unlock',
    description: 'sets AFK.',
    aliases: [],
    permissions: ['SEND_MESSAGES', 'MANAGE_GUILD'],
    async execute(message, args, bot, Discord, prefix) {
	    let channel = message.channel;
	    if (args[0]&&message.mentions.channels.first()&&args[0].includes(message.mentions.channels.first().id))
	    {
	        channel = message.mentions.channels.first();
	        args = args.slice(1);
	    }

      if (channel.type=="GUILD_PUBLIC_THREAD"||message.channel.type=="GUILD_PRIVATE_THREAD") return message.reply("Cannot unlock a thread.")
            if(!channel.permissionsFor(message.member).has("MANAGE_CHANNEL")) {
                message.channel.send("You don't have the required permissions.");
                return;
            }
	    if (channel.permissionsFor(channel.guild.roles.everyone).has("SEND_MESSAGES")) return message.channel.send(`${channel} is not locked`);
	    channel.permissionOverwrites.edit(channel.guild.roles.everyone, { SEND_MESSAGES: null });
	    message.channel.send(`Successfully unlocked ${channel}`);
	    let emb = embedbuilder.createEmbedGenerator(message)
	     .setTitle("Channel unlocked")
	     .setDescription(`Unlocked this channel${args.length>0?"\nReason: "+args.join(" "):""}`)
	    channel.send({embeds:[emb]});
    }
}
