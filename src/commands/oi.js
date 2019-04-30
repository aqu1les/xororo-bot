const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        message.author.send('EAI CARAIO');
        return;

    },
    get command() {
        return {
            name: 'oi',
            usage: 'oi'
        }
    }
}