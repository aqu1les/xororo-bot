const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event, args) => {
    const commands = [...client.commands.keys()]
      .map((key) => `!${key}`)
      .join(' ');
    const message = `Os comandos são: ${commands}`;

    event.reply(message);
  },
  get command() {
    return {
      name: 'comandos',
      usage: 'comandos',
      description: 'Lista todos os comandos do bot',
      options: []
    };
  }
};
