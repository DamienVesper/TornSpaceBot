const Discord = require(`discord.js`);
const { config } = require(`../index.js`);
const jsonstore = require(`jsonstore.io`);
let store = new jsonstore(`${config.jsonstoreToken}/users`);

module.exports.run = async(client, message, args) => {
    return;
}

module.exports.config = {
  name: `balance`
}