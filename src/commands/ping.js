const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run(client, event) {
    event.channel.send('pong');
    return;
  },
  get command() {
    return {
      name: 'ping',
      usage: 'ping',
      description: 'Pong?'
    };
  }
};
