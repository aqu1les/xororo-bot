const Discord = require('discord.js');
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
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event, args) => {
    if (args.join(' ') == 'a braba') {
      event.member.voice.channel.join().then(async (connection) => {
        event.reply('lansando a braba fdp');
        await play(connection).catch(() => {
          event.reply('deu pra lansar a braba não mano');
        });
      });
    }

    const brabas = await inc_brabas(event.member.id, event.member.username);
    if (brabas === 1) return event.reply(`lansou a braba pela primeira vez!`);
    return event.channel.send(`Você lansou a braba ${brabas} vezes, fdp`);
  },
  get command() {
    return {
      name: 'lanse',
      usage: 'lanse',
      description: 'Te lansa uma braba',
      options: [
        {
          name: 'a braba?',
          type: 'STRING',
          description: 'vai querer a braba?',
          required: false
        }
      ]
    };
  }
};
