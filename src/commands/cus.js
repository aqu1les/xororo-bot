const Discord = require('discord.js');
const User = require('../model/User');

async function getCusComidos(id, username) {
  const user =
    (await User.findOne({ uid: id })) ||
    (await User.create({ uid: id, name: username }));

  if (user.cus_comidos.length === 0) {
    return 'você ainda não comeu o cu de ninguém';
  }

  const cus_comidos = user.cus_comidos.reduce(
    (users, id) => ({ ...users, [id]: users[id] ? users[id] + 1 : 1 }),
    {}
  );

  const response = Object.entries(cus_comidos)
    .map(([username, times]) => `${username} ${times}x`)
    .join('\n');

  return `Você comeu:\n${response}`;
}

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event, args) => {
    const response = await getCusComidos(
      event.member.id,
      event.member.username
    );

    event.reply(response);
  },
  get command() {
    return {
      name: 'cus',
      usage: 'cus',
      description: 'Lista quantos cus você já comeu',
      options: []
    };
  }
};
