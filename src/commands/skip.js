const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection) {
            if (message.guild.voiceConnection.dispatcher) return message.guild.voiceConnection.player.dispatcher.end();
        } else {
            return message.channel.send("como que skipa se n ta tocando nada desgraça");
        }
    },
    get command() {
        return {
            name: 'skip',
            usage: 'skip'
        }
    }
}
