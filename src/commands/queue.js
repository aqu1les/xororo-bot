const Discord = require('discord.js');
const playlist = require('../features/playlist')();
const { millisToMinutes } = require('../adapters/utils');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    if (!event.guild.voice || !event.guild.voice.connection) {
      return event.reply('a playlist ta vazia meu guerreiro');
    }

    const songs = [...playlist.getPlaylist(event.guild.id)];
    const dispatcher = event.guild.voice.connection.dispatcher;

    let response = `Música atual: ${songs[0].title} - ${millisToMinutes(
      dispatcher.streamTime
    )} / ${songs[0].duration}`;
    songs.shift();

    songs.forEach(
      (song, index) =>
        (response += `\n${index + 1} - ${song.title} - 0:00 / ${song.duration}`)
    );
    return event.channel.send(response);
  },
  get command() {
    return {
      name: 'queue',
      usage: 'queue',
      description: 'Mostra a playlist atual'
    };
  }
};
