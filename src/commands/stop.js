const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        if(message.guild.voiceConnection) {
            if(message.guild.voiceConnection.dispatcher) message.guild.voiceConnection.player.dispatcher.end();
            else {
                message.guild.voiceConnection.dispatcher.end();
                message.guild.voiceConnection.disconnect();
            }
        }
        return;
    },
    get command() {
        return {
            name: 'stop',
            usage: 'stop'
        }
    }
}