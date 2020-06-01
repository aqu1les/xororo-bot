const ytdl = require('ytdl-core');
const ytb = require('../adapters/ytb');
const playlist = require('../features/playlist')();
const createEmbed = require('../adapters/embed');
const { millisToMinutes } = require('../adapters/utils');

let author = {};
let channelID = null;

async function play(connection, message) {
    try {
        const music = playlist.getFirstMusic(channelID);

        const clientResponse = createEmbed(
            `Vo toca essa braba aqui`,
            '#e80a21',
            music.title,
            music.link || music.url,
            music.thumbnail,
            {
                text: author.username || 'aqu1les',
                icon: author.avatarURL || 'https://i.imgur.com/FYaQiTu.jpg',
            },
            true
        );

        message.channel.send(clientResponse);
        const playableData = await ytdl(music.link || music.url, {
            filter: 'audio',
        });
        const dispatcher = connection.playStream(playableData);
        dispatcher.setVolume(1);

        dispatcher.on('error', (e) => {
            console.log(e);
        });

        dispatcher.on('end', () => {
            playlist.popMusic(channelID);
            if (playlist.getPlaylistLength(channelID) === 0)
                return connection.disconnect();
            play(connection, message);
        });

        connection.on('disconnect', () => {
            playlist.setPlaylist(channelID);
        });
    } catch (e) {
        console.error(e);
        message.channel.send(`Deu algum erro aqui viado`);
        connection.disconnect();
    }
}

async function handlePlaylist(playlistURL, serverID) {
    const musics = await ytb.fetchPlaylist(playlistURL);
    musics.map((music) => {
        playlist.addMusic(music, serverID);
    });
    return musics.length;
}

async function handleYtbSearch(keywords, serverID) {
    const music = await ytb.search(keywords);
    playlist.addMusic(music, serverID);
    return music;
}

async function handleYtbLink(URL, serverID) {
    const ytb_music = await ytdl.getBasicInfo(URL);
    const music = {
        thumbnail: ytb_music.thumbnail_url,
        link: URL,
        title: ytb_music.title,
        duration: millisToMinutes(ytb_music.length_seconds * 1000),
    };
    playlist.addMusic(music, serverID);
    return music;
}

module.exports = {
    run: async (client, message, args) => {
        author = await client.fetchUser('246470177376567297');
        channelID = message.guild.id;
        try {
            if (args.length !== 0) {
                /* Se o bot não tiver no canal */
                if (!message.guild.voiceConnection) {
                    const connection = await message.member.voiceChannel
                        .join()
                        .catch((err) => {
                            console.log(err);
                            return message.reply('não dá pra entrar ai viado');
                        });

                    if (args.length === 1 && ytb.validateURL(args[0])) {
                        const totalMusics = await handlePlaylist(
                            args[0],
                            channelID
                        );

                        message.channel.send(
                            `${totalMusics} músicas adicionadas à playlist.`
                        );
                    } else if (args.length === 1 && ytdl.validateURL(args[0])) {
                        await handleYtbLink(args[0], channelID);
                    } else {
                        await handleYtbSearch(args.join(' '), channelID);
                    }

                    play(connection, message);
                } else {
                    if (args.length === 1 && ytb.validateURL(args[0])) {
                        try {
                            const totalMusics = await handlePlaylist(
                                args[0],
                                channelID
                            );
                            message.channel.send(
                                `${totalMusics} músicas adicionadas à playlist.`
                            );
                        } catch (e) {
                            message.channel.send(
                                'deu erro adicionando as musicas da playlist parsero'
                            );
                        }

                        return;
                    } else if (args.length === 1 && ytdl.validateURL(args[0])) {
                        await handleYtbLink(args[0], channelID);
                    } else {
                        const music = await handleYtbSearch(
                            args.join(' '),
                            channelID
                        );

                        const clientResponse = createEmbed(
                            `Música adicionada à playlist`,
                            '#e80a21',
                            music.title,
                            music.link || music.url,
                            music.thumbnail
                        );

                        message.channel.send(clientResponse);
                        return;
                    }
                }
            } else {
                if (!message.guild.voiceConnection)
                    return message.reply(
                        'use !play <nome da musica> ou !play <link da musica no youtube> para tocar'
                    );
                if (message.guild.voiceConnection.player) {
                    message.guild.voiceConnection.player.dispatcher.resume();
                    message.react('▶️');
                }
            }
        } catch (e) {
            console.error(e);
            return message.reply('foi mal viado, deu algum erro aqui');
        }
    },
    get command() {
        return {
            name: 'play',
            usage: 'play',
        };
    },
};
