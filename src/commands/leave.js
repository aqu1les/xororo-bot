module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection)
            message.guild.voiceConnection.disconnect();
    },
    get command() {
        return {
            name: 'leave',
            usage: 'leave',
        };
    },
};
