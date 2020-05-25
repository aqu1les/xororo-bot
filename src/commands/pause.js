module.exports = {
    run: (client, message) => {
        if (!message.guild.voiceConnection)
            return message.reply('tem nada pra pausar carai');
        const dispatcher = message.guild.voiceConnection.dispatcher;
        if (dispatcher) {
            if (dispatcher.paused) {
                dispatcher.resume();
                message.react('▶️');
            }
            dispatcher.pause();
            message.react('⏸️');
        }
    },
    get command() {
        return {
            name: 'pause',
            usage: 'pause',
        };
    },
};
