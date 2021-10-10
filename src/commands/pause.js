const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    if (!event.guild.voice || !event.guild.voice.connection) {
      return event.reply('tem nada pra pausar carai');
    }

    const dispatcher = event.guild.voice.connection.dispatcher;
    if (dispatcher) {
      if (dispatcher.paused) {
        dispatcher.resume();
        event.react('▶️');
      }
      dispatcher.pause();
      event.react('⏸️');
    }
  },
  get command() {
    return {
      name: 'pause',
      usage: 'pause',
      description: 'Pausa a música que está tocando'
    };
  }
};
