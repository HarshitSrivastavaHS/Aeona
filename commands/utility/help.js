let embedbuilder=require("../../util/embedBuilder.js")
module.exports = {
    name: 'help',
    description: 'shows the help menu',
    aliases: [],
    usage: "&{prefix}help",
    permissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
    async execute(message, args, bot, Discord, prefix) {
        const PREFIX_REG = /&{prefix}/g;
        const fs = require('fs');
        const categories = fs.readdirSync(`./commands/`);
        let cmd = bot.commands.get(args[0]?args[0].toLowerCase():"")?.command || bot.commands.find(c=>c.aliases&&c.aliases.includes(args[0]?args[0].toLowerCase():""))?.command;
        let ctg = categories.find(c=>c==args[0]?.toLowerCase())
        const helpembed = embedbuilder.createEmbedGenerator(message)
        .setTitle('Help Menu')
        //.setFooter(`Requested by ${message.author.username}`)
        if (cmd) {
           const command = cmd; 
           helpembed.addField(`Name`,  `${command.name}`); 
           helpembed.addField(`Description`, `${command.description}`);  helpembed.addField(`Usage`,  `${command.usage?command.usage.replace(PREFIX_REG, prefix):"not added"}`)  
           helpembed.addField(`Aliases`,  `${command.aliases.length>0?command.aliases.join(", "):"No Alias"}`);  
           
           helpembed.addField( `Permissions Required by bot`, `${command.permissions?command.permissions.join(", ").toLowerCase().replace(/_/g," "):"not added"}`);
        }
        else if (ctg) {
            let cat = fs.readdirSync(`./commands/${ctg}/`).filter(f=>f.endsWith(".js"));
            let str = ""
            for (let file of cat){
                file = require(`../../commands/${ctg}/${file}`)
                str += `\`${file.name}\` `;
            }
            str = str.split(" ").filter(c=>c!="").join(", ")
              // Into groups of 5
            _str2 = [];
            str.split(" ").forEach((c,i) => {
              if((i+1) % 5 == 0) {
                _str2.push(c + "\n")
              } else {
                _str2.push(c)
              }
            })
            str = _str2.join(' ')
            helpembed.addFields({
                name: `Commands`,
                value: `${str?str:"No commands"}`
            })
        }
        else {
            helpembed.setDescription(`**Run \`${prefix}help <command>\` for further help on that command.**\n**Join the support server: https://discord.gg/hwa35nwYdr**`);
            let i = 0;
            const emotes = ["girl","rocket", "video_game", "tada", "robot", "compass", "person_curly_hair", "magnet", "tools"];
            for (let category of categories) {
              if(category == 'devteam-only') continue;
                let str = "";
                let commands = fs.readdirSync(`./commands/${category}/`).filter(f=>f.endsWith(".js"));
                for (const file of commands) {
                    const command = require(`../../commands/${category}/${file}`);
                    str += `\`${command.name}\` `;
                }
                str = str.split(" ").filter(s=>s!="").join(", ")
                   // Into groups of 5
                _str2 = [];
                 str.split(" ").forEach((c,i) => {
                  if((i+1) % 5 == 0) {
                   _str2.push(c + "\n")
                  } else {
                    _str2.push(c)
                 }
               })
                str = _str2.join(' ')
                helpembed.addFields({name:`:${emotes[i++]}: | ${category[0].toUpperCase()+category.substr(1, category.length)}`, value: str?str:"No command"});
            }
        }
        
        message.channel.send({embeds:[helpembed.embed]});
    }
}
 
