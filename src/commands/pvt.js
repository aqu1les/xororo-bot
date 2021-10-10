const Discord = require('discord.js');

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: (client, event) => {
    event.reply(event.member.avatarURL());
    return;
  },
  get command() {
    return {
      name: 'pvt',
      usagem: 'pvt',
      description: 'Sei lá',
      options: []
    };
  }
};
