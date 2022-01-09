const Discord = require("discord.js")
module.exports = {
	name: 'guildDelete',
	async execute(guild) {
           if (!guild) return;
           const bot = guild.client;
           bot.user.setPresence({
              activities: [{ name: `+help on ${bot.guilds.cache.size} servers!`, type: 'WATCHING' }],
           });
          //await bot.channels.get("909834168609955862").send({content:"<@&909825556323905636> Aeona was removed from: "+guild.id})
	},
};
