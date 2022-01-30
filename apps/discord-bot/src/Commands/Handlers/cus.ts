import { User } from '../../Model/User';
import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
import { DiscordCommandHandler } from '../Command';

export class CusCommand implements DiscordCommandHandler {
  readonly displayName = 'cus';
  readonly usage = 'cus';
  readonly description = 'Lista quantos cus você já comeu';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    const member = event.member as GuildMember;
    const response = await this.getCusComidos(member.id, member.user.username);

    event.reply(response);
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
