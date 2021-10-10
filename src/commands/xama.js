const Discord = require('discord.js');
const User = require('../model/User');

async function incXesques(id, username) {
  const user =
    (await User.findOne({ uid: id })) ||
    (await User.create({ uid: id, name: username, xesques: 0 }));
  user.xesques = user.xesques + 1;
  await user.save();
  return user.xesques;
}

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event) => {
    const xesques = await incXesques(event.member.id, event.member.username);
    if (xesques === 1) return event.reply(`xamou no xesque pela primeira vez!`);
    return event.channel.send(`Você xamou no xesque ${xesques} vezes !`);
  },
  get command() {
    return {
      name: 'xama',
      usage: 'xama',
      description: 'XAAAAAAAAAAAAAAAAAMA',
      options: []
    };
  }
};
