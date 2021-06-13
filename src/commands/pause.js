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
      return message.reply('tem nada pra pausar carai');
    }

    const dispatcher = message.guild.voice.connection.dispatcher;
    if (dispatcher) {
      if (dispatcher.paused) {
        dispatcher.resume();
        message.react('▶️');
      }
      dispatcher.pause();
      message.react('⏸️');
    }
  },
  get command() {
    return {
      name: 'pause',
      usage: 'pause'
    };
  }
};
