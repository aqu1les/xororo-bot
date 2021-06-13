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
   * @param {Discord.Message} message
   * @returns
   */
  run: (client, message) => {
    if (!botIsConnected(message.guild)) {
      return message.channel.send(`sai tu`);
    }

    if (!memberIsOnVoiceChannel(message.member)) {
      return message.channel.send(`se fude porra`);
    }

    if (
      !isSameChannel(message.guild.voice.channel, message.member.voice.channel)
    ) {
      return message.channel.send(
        `tu nem ta nesse canal de voz amigão, me deixa em paz`
      );
    }

    message.guild.voice.connection.disconnect();
    playlist.setPlaylist(message.guild.id);
  },
  get command() {
    return {
      name: 'leave',
      usage: 'leave'
    };
  }
};
