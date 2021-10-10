const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    event.member.send('EAI CARAIO');
    return;
  },
  get command() {
    return {
      name: 'oi',
      usage: 'oi',
      description: 'Salve?'
    };
  }
};
