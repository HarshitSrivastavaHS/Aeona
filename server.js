const server = require('http').createServer((req, res) => {
  res.writeHead(200).end('<B>Aeona is online</B>');
});
const fetch = require("node-fetch");
function keepAlive(){
    fetch("https://DumBotAiml.deepsarda.repl.co")
    server.listen(3000, ()=>{console.log("Server is Ready!")});
}
module.exports = keepAlive;
