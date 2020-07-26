module.exports = {
  run(client, message) {
    message.channel.send('pong');
    return;
  },
  get command() {
    return {
      name: 'ping',
      usage: 'ping'
    };
  }
};
