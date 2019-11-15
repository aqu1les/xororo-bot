const Discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        return message.channel.send(`${message.author.username} lansou a braba`);
    },
    get command() {
        return {
            name: 'lanse',
            usage: 'lanse'
        }
    }
}