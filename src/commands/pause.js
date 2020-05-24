module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection) {
            const dispatcher = message.guild.voiceConnection.dispatcher;
            if (dispatcher) {
                if (dispatcher.paused) {
                    dispatcher.resume();
                }
                dispatcher.pause();
                message.react('⏸️');
            }
        }
        return;
    },
    get command() {
        return {
            name: 'pause',
            usage: 'pause',
        };
    },
};
