const ytdl = require('ytdl-core');
const playlist = require('../features/playlist')();
const createEmbed = require('../adapters/embed');
const Discord = require('discord.js');
const { VoiceConnection } = require('@discordjs/voice');

/**
 *
 * @param {VoiceConnection} connection
 * @param {Discord.TextBasedChannels} textChannel
 * @param {string} guildId
 * @param {Discord.User} author
 */
async function playOnVoiceConnection(connection, textChannel, guildId, author) {
  try {
    const music = playlist.getFirstMusic(guildId);

    const clientResponse = createEmbed(
      `Vo toca essa braba aqui`,
      '#e80a21',
      music.title,
      music.link || music.url,
      music.thumbnail,
      {
        text: author?.username || 'aqu1les',
        icon: author?.avatarURL() || 'https://i.imgur.com/FYaQiTu.jpg'
      },
      true
    );

    textChannel.send(clientResponse);
    const playableData = ytdl(music.link || music.url, {
      filter: 'audio'
    });
    const dispatcher = connection.play(playableData);
    dispatcher.setVolume(1);

    dispatcher.on('error', (e) => {
      console.log(e);
    });

    dispatcher.on('end', () => {
      playlist.popMusic(guildId);

      if (playlist.getPlaylistLength(guildId) === 0) {
        return connection.disconnect();
      }

      playOnVoiceConnection(connection, textChannel, guildId);
    });

    connection.on('disconnect', () => {
      playlist.setPlaylist(guildId);
    });
  } catch (e) {
    console.error(e);
    textChannel.send(`Deu algum erro aqui viado`);
    connection.disconnect();
  }
}

module.exports = {
  playOnVoiceConnection
};
