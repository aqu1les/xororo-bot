const Discord = require('discord.js');
const {
  memberIsOnVoiceChannel,
  botIsConnected,
  createVoiceConnection
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
      return event.reply(
        `vo entrar aonde? tu n ta em nenhum canal de voz diabo`
      );
    }

    if (!botIsConnected(event.guildId)) {
      event.reply('Entrando...');
      return createVoiceConnection(event.member.voice.channel.id, event.guild);
    }

    return event.reply('to ocupado, da licença');
  },
  get command() {
    return {
      name: 'join',
      usage: 'join',
      description: 'Entra no seu canal de voz',
      options: []
    };
  }
};
