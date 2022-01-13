const Discord = require("discord.js")
//
module.exports = {
	name: 'guildCreate',
	async execute(guild) {
           if (!guild) return;
           const bot = guild.client;
           bot.user.setPresence({
              activities: [{ name: `+help on ${bot.guilds.cache.size} servers!`, type: 'WATCHING' }],
           });

	},
};
