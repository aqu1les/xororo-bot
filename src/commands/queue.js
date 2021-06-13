const playlist = require('../features/playlist')();
const { millisToMinutes } = require('../adapters/utils');
const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @returns
   */
  run: (client, message) => {
    if (!message.guild.voice || !message.guild.voice.connection) {
      return message.reply('a playlist ta vazia meu guerreiro');
    }

    const songs = [...playlist.getPlaylist(message.guild.id)];
    const dispatcher = message.guild.voice.connection.dispatcher;

    let response = `Música atual: ${songs[0].title} - ${millisToMinutes(
      dispatcher.time
    )} / ${songs[0].duration}`;
    songs.shift();

    songs.forEach(
      (song, index) =>
        (response += `\n${index + 1} - ${song.title} - 0:00 / ${song.duration}`)
    );
    return message.channel.send(response);
  },
  get command() {
    return {
      name: 'queue',
      usage: 'queue'
    };
  }
};
