const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection) {
            if (message.guild.voiceConnection.dispatcher) {
               return message.guild.voiceConnection.disconnect();
            }
        }
    },
    get command() {
        return {
            name: 'stop',
            usage: 'stop'
        }
    }
}
