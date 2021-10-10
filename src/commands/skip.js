const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    if (event.guild.voice && event.guild.voice.connection) {
      const connection = event.guild.voice.connection;

      if (connection && connection.dispatcher) {
        return connection.player.dispatcher.end();
      }
    }

    return event.channel.send('como que skipa se n ta tocando nada desgraça');
  },
  get command() {
    return {
      name: 'skip',
      usage: 'skip',
      description: 'Pula a musica que tá tocando',
      options: []
    };
  }
};
