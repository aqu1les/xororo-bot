const User = require('../model/User');
const Discord = require('discord.js');

async function inc_cus(id, username, target_id) {
  const user = await User.findOne({ uid: id });
  if (user) {
    user.cus_comidos = [...user.cus_comidos, target_id];
    await user.save();
  } else {
    await User.create({ uid: id, name: username });
  }
}

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   * @returns
   */
  run: async (client, event, args) => {
    if (args.length == 0) {
      return event.reply(' marque a pessoa que você gostaria de comer o cu.');
    }

    if (args[0].substring(0, 2) !== '<@') {
      return event.reply(
        ' por favor marque a pessoa que você gostaria de comer o cu.'
      );
    }

    const chances = getRandomInt(0, 101);
    let response = ` você tem ${chances}% de chances de comer o cu de ${args}.`;

    if (chances >= 100) {
      inc_cus(event.member.id, event.member.username, String(args[0]));
      response = ` com 100% de chances você comeu o cu de ${args}. Parabéns!`;
    }

    event.reply(response);
  },
  get command() {
    return {
      name: 'cu',
      usage: 'cu',
      description:
        'Calcula a porcentagem de chances que você tem de comer o cu de alguém',
      options: [
        {
          name: 'alvo',
          type: 'STRING',
          description: 'A pessoa que você gostaria de comer',
          required: true
        }
      ]
    };
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
