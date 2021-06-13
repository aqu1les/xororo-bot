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
      return message.reply('There is nothing to resume :)');
    }

    const connection = message.guild.voice.connection;
    if (connection.player) {
      const dispatcher = connection.dispatcher;
      if (dispatcher.paused) {
        dispatcher.resume();
        message.react('▶️');
      }
    }
  },
  get command() {
    return {
      name: 'resume',
      usage: 'resume'
    };
  }
};
