const Discord = require('discord.js');
const {
  memberIsOnVoiceChannel,
  botIsConnected,
  connectOnChannel
} = require('../helpers/voice-connection');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @returns
   */
  run: (client, message) => {
    if (!memberIsOnVoiceChannel(message.member)) {
      return message.channel.send(
        `vo entrar aonde? tu n ta em nenhum canal de voz diabo`
      );
    }
    const memberChannel = message.member.voice.channel;

    if (!botIsConnected(message.guild)) {
      return connectOnChannel(memberChannel, message.channel);
    }

    return message.channel.send('to ocupado, da licença');
  },
  get command() {
    return {
      name: 'join',
      usage: 'join'
    };
  }
};
