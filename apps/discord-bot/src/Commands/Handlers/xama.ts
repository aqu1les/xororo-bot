import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
import User from '../../model/User';
import { AppCommand } from '../Command';

export class XamaCommand implements AppCommand {
  readonly displayName = 'xama';
  readonly usage = 'xama';
  readonly description = 'XAAAAAAAAAAAAAAAAAMA';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    const member = event.member as GuildMember;

    const xesques = await incXesques(member.id, member.user.username);
    if (xesques === 1) {
      return event.reply(`xamou no xesque pela primeira vez!`);
    }

    event.channel?.send(`Você xamou no xesque ${xesques} vezes !`);
  }
}

async function incXesques(id: string, username: string) {
  const user =
    (await User.findOne({ uid: id })) ||
    (await User.create({ uid: id, name: username, xesques: 0 }));
  user.xesques = user.xesques + 1;
  await user.save();
  return user.xesques;
}
