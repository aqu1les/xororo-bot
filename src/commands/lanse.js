const User = require('../model/User');
const ytdl = require('ytdl-core');

async function inc_brabas(id, username) {
  const user = await User.findOne({ uid: id });
  if (user) {
    user.brabas = user.brabas + 1;
    await user.save();
    return user.brabas;
  } else {
    await User.create({ uid: id, name: username, brabas: 1 });
    return 1;
  }
}
async function play(connection) {
  const dispatcher = await connection.playStream(
    ytdl('https://www.youtube.com/watch?v=oowBXzfcl90', {
      filter: 'audioonly'
    })
  );
  dispatcher.setVolume(1);
  dispatcher.on('error', (e) => {
    console.log(e);
  });
  dispatcher.on('end', () => {
    return connection.disconnect();
  });
}

module.exports = {
  run: async (client, message, args) => {
    if (args.join(' ') == 'a braba') {
      message.member.voice.channel.join().then(async (connection) => {
        message.reply('lansando a braba fdp');
        await play(connection).catch(() => {
          message.reply('deu pra lansar a braba não mano');
        });
      });
    }

    const brabas = await inc_brabas(message.author.id, message.author.username);
    if (brabas === 1) return message.reply(`lansou a braba pela primeira vez!`);
    return message.channel.send(`Você lansou a braba ${brabas} vezes, fdp`);
  },
  get command() {
    return {
      name: 'lanse',
      usage: 'lanse'
    };
  }
};
