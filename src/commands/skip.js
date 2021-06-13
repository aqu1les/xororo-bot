const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message} message
   * @returns
   */
  run: (client, message) => {
    if (message.guild.voice && message.guild.voice.connection) {
      const connection = message.guild.voice.connection;

      if (connection && connection.dispatcher) {
        return connection.player.dispatcher.end();
      }
    }

    return message.channel.send('como que skipa se n ta tocando nada desgraça');
  },
  get command() {
    return {
      name: 'skip',
      usage: 'skip'
    };
  }
};
