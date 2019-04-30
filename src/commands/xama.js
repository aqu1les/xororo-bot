const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        message.channel.send('no xesque');
        return;
    },
    get command() {
        return {
            name: 'xama',
            usage: 'xama'
        }
    }
}