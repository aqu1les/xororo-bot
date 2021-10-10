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
      const { connection } = event.guild.voice;

      if (connection && connection.dispatcher) {
        event.channel.send('blz, fui de beise');
        return event.guild.voice.disconnect();
      }
    }

    return event.channel.send('tem nada pra parar porra');
  },
  get command() {
    return {
      name: 'stop',
      usage: 'stop',
      description: 'Para de tocar e vaza do canal de voz',
      options: []
    };
  }
};
