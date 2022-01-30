import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
// import ytdl from 'ytdl-core';
import { User } from '../../Model/User';

import { DiscordCommandHandler } from '../Command';

export class LanseCommand implements DiscordCommandHandler {
  readonly displayName = 'lanse';
  readonly usage = 'lanse';
  readonly description = 'Te lansa uma braba';
  readonly interactionOptions = [
    {
      name: 'braba',
      type: 'STRING',
      description: 'vai querer a braba?',
      required: false
    }
  ];

  async run(client: Client, event: Message | CommandInteraction) {
    /** TODO: arrumar */

    // if (args.join(' ') == 'a braba') {
    //   event.member.voice.channel.join().then(async (connection) => {
    //     event.reply('lansando a braba fdp');
    //     await play(connection).catch(() => {
    //       event.reply('deu pra lansar a braba não mano');
    //     });
    //   });
    // }

    const member = event.member as GuildMember;
    const brabas = await incBrabas(member.id, member.user.username);
    if (brabas === 1) {
      return event.reply(`lansou a braba pela primeira vez!`);
    }

    return event.reply(`Você lansou a braba ${brabas} vezes, fdp`);
  }
}

async function incBrabas(id: string, username: string) {
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

// async function play(connection) {
//   const dispatcher = await connection.playStream(
//     ytdl('https://www.youtube.com/watch?v=oowBXzfcl90', {
//       filter: 'audioonly'
//     })
//   );
//   dispatcher.setVolume(1);
//   dispatcher.on('error', (e) => {
//     console.log(e);
//   });
//   dispatcher.on('end', () => {
//     return connection.disconnect();
//   });
// }
