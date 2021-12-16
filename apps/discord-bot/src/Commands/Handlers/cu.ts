import User from '../../Model/User';
import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
import { AppCommand } from '../Command';

export class CuCommand implements AppCommand {
  readonly displayName = 'cu';
  readonly usage = 'cu';
  readonly description =
    'Calcula a porcentagem de chances que você tem de comer o cu de alguém';
  readonly interactionOptions = [
    {
      name: 'alvo',
      type: 'STRING',
      description: 'A pessoa que você gostaria de comer',
      required: true
    }
  ];

  async run(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ) {
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
      const member = event.member as GuildMember;
      await this.incrementCus(member.id, member.user.username, String(args[0]));
      response = ` com 100% de chances você comeu o cu de ${args}. Parabéns!`;
    }

    event.reply(response);
  }

  async incrementCus(id: string, username: string, target_id: string) {
    const user = await User.findOne({ uid: id });
    if (user) {
      user.cus_comidos = [...user.cus_comidos, target_id];
      await user.save();
    } else {
      await User.create({ uid: id, name: username });
    }
  }
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min)) + min;
}
