import { Message, CommandInteraction, Client } from 'discord.js';
import { CusCommand } from '@xororo/core/commands';
import { User } from '../../../Model/User';
import { DiscordCommandHandler } from '../../Command';
import { interactionAdapter } from './interaction.adapter';

export class CusCommandAdapter
  extends CusCommand
  implements DiscordCommandHandler
{
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    return super.exec(interactionAdapter(event));
  }

  async getCusComidos(id: string, username: string) {
    const user =
      (await User.findOne({ uid: id })) ||
      (await User.create({ uid: id, name: username }));

    if (user.cus_comidos.length === 0) {
      return 'você ainda não comeu o cu de ninguém';
    }

    const cus_comidos = user.cus_comidos.reduce(
      (users: any, id: any) => ({
        ...users,
        [id]: users[id] ? users[id] + 1 : 1
      }),
      {}
    );

    const response = Object.entries(cus_comidos)
      .map(([username, times]) => `${username} ${times}x`)
      .join('\n');

    return `Você comeu:\n${response}`;
  }
}
