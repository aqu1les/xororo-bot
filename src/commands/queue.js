const playlist = require('../features/playlist')();
const { millisToMinutes } = require('../adapters/utils');

module.exports = {
    run: (client, message) => {
        if (!message.guild.voiceConnection)
            return message.reply('a playlist ta vazia meu guerreiro');
        let response;
        let songs = [...playlist.getPlaylist(message.guild.id)];
        let dispatcher = message.guild.voiceConnection.dispatcher;

        response = `Música atual: ${songs[0].title} - ${millisToMinutes(
            dispatcher.time
        )} / ${songs[0].duration}`;
        songs.shift();

        songs.forEach(
            (song, index) =>
                (response += `\n${index + 1} - ${song.title} - 0:00 / ${
                    song.duration
                }`)
        );
        return message.channel.send(response);
    },
    get command() {
        return {
            name: 'queue',
            usage: 'queue',
        };
    },
};
