const Discord = require('discord.js');

module.exports = {
    run: (client, message) => {
        if(message.guild.voiceConnection) {
            const dispatcher = message.guild.voiceConnection.dispatcher;
            if(dispatcher) {
                if(dispatcher.paused){
                    dispatcher.resume();
                }
                dispatcher.pause();
            }
        }
        return;
    },
    get command() {
        return {
            name: 'pause',
            usage: 'pause'
        }
    }
}