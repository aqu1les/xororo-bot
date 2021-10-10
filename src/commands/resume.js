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
      return event.reply('There is nothing to resume :)');
    }

    const connection = event.guild.voice.connection;
    if (connection.player) {
      const dispatcher = connection.dispatcher;
      if (dispatcher.paused) {
        dispatcher.resume();
        event.react('▶️');
      }
    }
  },
  get command() {
    return {
      name: 'resume',
      usage: 'resume',
      description: 'Da play na musica pausada',
      options: []
    };
  }
};
