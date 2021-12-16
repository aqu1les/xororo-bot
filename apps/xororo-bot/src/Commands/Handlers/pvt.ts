import { Message, CommandInteraction, Client } from 'discord.js';
import { AppCommand } from '../Command';

export class PvtCommand implements AppCommand {
  readonly displayName = 'pvt';
  readonly usage = 'pvt';
  readonly description = 'Sei lá';
  readonly interactionOptions = [];

  run(client: Client, event: Message | CommandInteraction) {
    const avatar = event.member?.user.avatar;

    if (avatar) {
      return event.reply(avatar);
    }

    return;
  }
}
