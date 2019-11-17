const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection) {
            if (message.guild.voiceConnection.dispatcher) message.guild.voiceConnection.player.dispatcher.end();
        }
        return;
    },
    get command() {
        return {
            name: 'skip',
            usage: 'skip'
        }
    }
}