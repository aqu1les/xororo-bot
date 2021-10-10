const { getVoiceConnection } = require('@discordjs/voice');
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
    if (!botIsConnected(event.guild.id)) {
      return event.reply(`sai tu`);
    }

    if (!memberIsOnVoiceChannel(event.member)) {
      return event.reply(`se fude porra`);
    }

    const connection = getVoiceConnection(event.guild.id);
    const channelMock = { id: connection.joinConfig.channelId };

    if (!isSameChannel(channelMock, event.member.voice.channel)) {
      return event.reply(
        `tu nem ta nesse canal de voz amigão, me deixa em paz`
      );
    }

    connection.disconnect();
    playlist.setPlaylist(event.guild.id);

    return event.reply(`bejo`);
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
