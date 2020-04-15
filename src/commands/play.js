const { RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const ytpl = require('ytpl');
const playlist = require('../features/playlist');

let author = {};

async function play(connection, message) {
    let music = playlist.getFirstMusic();
    
    const embed = new RichEmbed()
        .setColor('#e80a21')
        .setTitle(`Vo toca essa braba aqui`)
        .setDescription(music.title)
        .setURL(music.link || music.url)
        .setThumbnail(music.thumbnail)
        .setFooter(author.username || 'aqu1les', author.avatarURL || 'https://i.imgur.com/FYaQiTu.jpg')
        .setTimestamp();

    message.channel.send(embed);

    try {
        const musicStream = await ytdl(music.link || music.url, { filter: 'audio' });
        const dispatcher = await connection.playStream(musicStream);
        dispatcher.setVolume(1);
        connection.on('disconnect', () => {
            playlist.setPlaylist();
        });
        dispatcher.on('error', e => {
            console.log(e);
        });
        dispatcher.on('end', () => {
            if (playlist.getLength() === 0) return connection.disconnect();
            play(connection, message);
        });

    } catch(e) {
        console.log(e);
    }
}

async function searchMusic(name) {
    const response = await ytsr(name, { limit: 1 });
    const musics = response.items.filter(item => item.type === 'video');
    return musics[0];
}

async function getPlaylist(playlistLink) {
    const musics = await ytpl(playlistLink);
    return musics.items;
}

module.exports = {
    run: async (client, message, args) => {
        author = await client.fetchUser('246470177376567297');
        if (args.length !== 0) {
            if (message.guild.voiceConnection) {
                if (message.guild.voiceConnection.player) {
                    if (args.length === 1 && ytpl.validateURL(args[0])) {
                        const musics = await getPlaylist(args[0]);
                        musics.map(music => {
                            playlist.addMusic(music);
                        });
                        return message.channel.send(`${musics.length} músicas adicionadas à playlist.`);
                    } else {
                        const music = await searchMusic(args.join(' '));
                        playlist.addMusic(music);
                        return message.channel.send(`${music.title} foi adicionada à playlist.`);
                    }
                }
            }
            if (args.length === 1 && ytpl.validateURL(args[0])) {
                message.member.voiceChannel.join()
                    .then(async connection => {
                        const musics = await getPlaylist(args[0]);
                        musics.map(music => {
                            playlist.addMusic(music);
                        });
                        const embed = new RichEmbed()
                            .setColor('#e80a21')
                            .setTitle(`Playlist`)
                            .setDescription(`${musics.length} músicas foram adicionadas à playlist.`)
                            .setFooter('aqu1les', 'https://i.imgur.com/FYaQiTu.jpg')
                            .setTimestamp();
                        message.channel.send(embed);
                        play(connection, message);
                    }).catch(err => {
                        console.log(err);
                        return message.reply('deu pra tocar nao flw');
                    });
            } else {
                message.member.voiceChannel.join()
                    .then(async connection => {
                        let music = await searchMusic(args.join(' '));
                        playlist.addMusic(music);
                        play(connection, message);
                    }).catch(err => {
                        return message.reply('não da pra entrar no seu canal');
                    });
            }
        } else {
            if (!message.guild.voiceConnection) return;
            if (message.guild.voiceConnection.player) {
                message.guild.voiceConnection.player.dispatcher.resume();
            }
        }
    },
    get command() {
        return {
            name: 'play',
            usage: 'play'
        }
    }
}
