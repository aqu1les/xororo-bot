module.exports = {
  run: (client, message) => {
    if (!message.guild.voiceConnection) {
      return message.reply('There is nothing to resume :)');
    }
    if (message.guild.voiceConnection.player) {
      const dispatcher = message.guild.voiceConnection.player.dispatcher;
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
