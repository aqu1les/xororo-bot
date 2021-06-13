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
      const { connection } = message.guild.voice;

      if (connection && connection.dispatcher) {
        message.channel.send('blz, fui de beise');
        return message.guild.voice.disconnect();
      }
    }

    return message.channel.send('tem nada pra parar porra');
  },
  get command() {
    return {
      name: 'stop',
      usage: 'stop'
    };
  }
};
