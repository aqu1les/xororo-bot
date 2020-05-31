const playlist = require('../features/playlist')();

module.exports = {
    run: (client, message) => {
        if (message.guild.voiceConnection) {
            message.guild.voiceConnection.disconnect();
            playlist.setPlaylist(message.guild.id);
        }
    },
    get command() {
        return {
            name: 'leave',
            usage: 'leave',
        };
    },
};
