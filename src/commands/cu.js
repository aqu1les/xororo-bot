const User = require('../model/User');

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
  run: async (client, message, args) => {
    if (Array(args).length == 0)
      return message.reply(' marque a pessoa que você gostaria de comer o cu.');
    if (String(args[0]).substring(0, 2) !== '<@')
      return message.reply(
        ' por favor marque a pessoa que você gostaria de comer o cu.'
      );
    const chances = getRandomInt(0, 101);
    if (chances >= 100) {
      inc_cus(message.author.id, message.author.username, String(args[0]));
      return message.reply(
        ` com 100% de chances você comeu o cu de ${args}. Parabéns!`
      );
    }
    message.reply(` você tem ${chances}% de chances de comer o cu de ${args}.`);
  },
  get command() {
    return {
      name: 'cu',
      usage: 'cu'
    };
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
