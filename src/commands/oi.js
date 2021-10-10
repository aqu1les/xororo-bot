const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    return event.reply('EAI CARAIO');
  },
  get command() {
    return {
      name: 'oi',
      usage: 'oi',
      description: 'Salve?',
      options: []
    };
  }
};
