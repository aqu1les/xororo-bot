const Discord = require('discord.js');
const {
  botIsConnected,
  isSameChannel,
  memberIsOnVoiceChannel
} = require('../helpers/voice-connection');
const playlist = require('../features/playlist')();

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    if (!botIsConnected(event.guild)) {
      return event.channel.send(`sai tu`);
    }

    if (!memberIsOnVoiceChannel(event.member)) {
      return event.channel.send(`se fude porra`);
    }

    if (!isSameChannel(event.guild.voice.channel, event.member.voice.channel)) {
      return event.channel.send(
        `tu nem ta nesse canal de voz amigão, me deixa em paz`
      );
    }

    event.guild.voice.connection && event.guild.voice.connection.disconnect();
    playlist.setPlaylist(event.guild.id);
  },
  get command() {
    return {
      name: 'leave',
      usage: 'leave',
      description: 'Sai do seu canal de voz',
      options: []
    };
  }
};
