const Discord = require("discord.js");

class EmbedGenerator {
   constructor(message) {
    this.message = message
    this.embed = new Discord.MessageEmbed()

    var colors = ["#0xF5E0DC","#0xF2CDCD","#0xC6AAE8","#0xE5B4E2","#0xE49CB3","#0xE38C8F","0xF7BE95","#0xECDDAA","#0xB1E1A6","#0xB7E5E6","#0x2D2E8","#0xC9CBFF"]
    var color = colors[Math.floor(Math.random() * colors.length)]

    this.embed = this.embed.setColor(color)
    this.embed = this.embed.setTimestamp()


    this.embed = this.embed.setAuthor({ 
      name: `${this.message.author.username}#${this.message.author.discriminator}`,
      iconURL: this.message.member.displayAvatarURL({dynamic: true })
    })

    this.setthisVariables()
  }
  
  setthisVariables(){
    this.author = this.embed.author;
    this.color = this.embed.color;
    this.createdAt = this.embed.createdAt;
    this.fields = this.embed.fields;
    this.footer = this.embed.footer;
    this.hexColor = this.embed.hexColor;
    this.image = this.embed.image;
    this.length = this.embed.length;
    this.provider = this.embed.provider;
    this.thumbnail = this.embed.thumbnail;
    this.timestamp = this.embed.timestamp;
    this.description=this.embed.description;
    this.title = this.embed.title;
    this.type = this.embed.thumbnail;
    this.url = this.embed.url;
    this.video = this.video;
  }
  setAuthor(author,avatar){
    this.embed=this.embed.setAuthor(author,avatar);
    this.setthisVariables();
    return this;
  }
  setTimestamp(){
    this.setthisVariables()
    return this;
  }

  setTitle(title){
    this.embed=this.embed.setTitle("<:purpletick:928982802425323520>・"+title)
    this.setthisVariables()
    return this;
  }
  setDescription(description){
    this.embed=this.embed.setDescription(description)
    this.setthisVariables()
    return this;
  }
  addFields(fields){
    this.embed=this.embed.addFields(fields)
    this.setthisVariables()
    return this;
  }
  toJSON(){
    this.setthisVariables()
    return this.embed.toJSON();
  }

  addField(fieldname, fieldvalue){
    this.setthisVariables()
    this.embed=this.embed.addField(fieldname,fieldvalue)
    return this;
  }
  setURL(url){
    this.setthisVariables()
    this.embed=this.embed.setURL(url)
    return this;
  }
  setImage(url){
    this.setthisVariables()
    this.embed=this.embed.setImage(url)
    return this;
  }
  setFooter(text){
    this.setthisVariables()
   // this.embed=this.embed.setFooter(text);
    return this;
  }
  footer(text){
    this.setthisVariables()
    this.embed=this.embed.setFooter(text);
    return this;
  }
  setThumbnail(url){
    this.setthisVariables()
    this.embed=this.embed.setThumbnail(url)
    return this;
  }
}
class EmbedGeneratorNoAuthor {
   constructor(message) {
    this.message = message
    this.embed = new Discord.MessageEmbed()

    var colors = ["#0xF5E0DC","#0xF2CDCD","#0xC6AAE8","#0xE5B4E2","#0xE49CB3","#0xE38C8F","0xF7BE95","#0xECDDAA","#0xB1E1A6","#0xB7E5E6","#0x2D2E8","#0xC9CBFF"]
    var color = colors[Math.floor(Math.random() * colors.length)]

    this.embed = this.embed.setColor(color)
    this.embed = this.embed.setTimestamp()


    
    this.setthisVariables()
  }
  
  setthisVariables(){
    this.author = this.embed.author;
    this.color = this.embed.color;
    this.createdAt = this.embed.createdAt;
    this.fields = this.embed.fields;
    this.footer = this.embed.footer;
    this.hexColor = this.embed.hexColor;
    this.image = this.embed.image;
    this.length = this.embed.length;
    this.provider = this.embed.provider;
    this.thumbnail = this.embed.thumbnail;
    this.timestamp = this.embed.timestamp;
    this.description=this.embed.description;
    this.title = this.embed.title;
    this.type = this.embed.thumbnail;
    this.url = this.embed.url;
    this.video = this.video;
  }
  setAuthor(author,avatar){
    this.embed=this.embed.setAuthor(author,avatar);
    this.setthisVariables();
    return this;
  }
  setTimestamp(){
    this.setthisVariables()
    return this;
  }

  setTitle(title){
    this.embed=this.embed.setTitle("<:purpletick:928982802425323520>・"+title)
    this.setthisVariables()
    return this;
  }
  setDescription(description){
    this.embed=this.embed.setDescription(description)
    this.setthisVariables()
    return this;
  }
  addFields(fields){
    this.embed=this.embed.addFields(fields)
    this.setthisVariables()
    return this;
  }
  toJSON(){
    this.setthisVariables()
    return this.embed.toJSON();
  }

  addField(fieldname, fieldvalue){
    this.setthisVariables()
    this.embed=this.embed.addField(fieldname,fieldvalue)
    return this;
  }
  setURL(url){
    this.setthisVariables()
    this.embed=this.embed.setURL(url)
    return this;
  }
  setImage(url){
    this.setthisVariables()
    this.embed=this.embed.setImage(url)
    return this;
  }
  setFooter(text){
    this.setthisVariables()
   // this.embed=this.embed.setFooter(text);
    return this;
  }
  footer(text){
    this.setthisVariables()
    this.embed=this.embed.setFooter(text);
    return this;
  }
  setThumbnail(url){
    this.setthisVariables()
    this.embed=this.embed.setThumbnail(url)
    return this;
  }
}
module.exports = {
  createEmbedGenerator(message){
    return new EmbedGenerator(message)
  },
  createEmbedGeneratorNoAuthor(message){
    return new EmbedGeneratorNoAuthor(message)
  }
}