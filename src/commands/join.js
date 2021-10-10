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
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    if (!memberIsOnVoiceChannel(event.member)) {
      return event.channel.send(
        `vo entrar aonde? tu n ta em nenhum canal de voz diabo`
      );
    }
    const memberChannel = event.member.voice.channel;

    if (!botIsConnected(event.guild)) {
      return connectOnChannel(memberChannel, event.channel);
    }

    return event.channel.send('to ocupado, da licença');
  },
  get command() {
    return {
      name: 'join',
      usage: 'join',
      description: 'Entra no seu canal de voz'
    };
  }
};
