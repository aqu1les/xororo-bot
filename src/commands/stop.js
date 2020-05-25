module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection) {
            if (message.guild.voiceConnection.dispatcher) {
                message.channel.send('blz, fui de beise');
                return message.guild.voiceConnection.disconnect();
            }
        } else {
            return message.channel.send('tem nada pra parar porra');
        }
    },
    get command() {
        return {
            name: 'stop',
            usage: 'stop',
        };
    },
};
