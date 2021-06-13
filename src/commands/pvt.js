module.exports = {
  run: (client, message) => {
    message.reply(message.author.avatarURL());
    return;
  },
  get command() {
    return {
      name: 'pvt',
      usagem: 'pvt'
    };
  }
};
