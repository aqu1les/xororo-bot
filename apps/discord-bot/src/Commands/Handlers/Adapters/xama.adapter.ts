import { Message, CommandInteraction, Client } from 'discord.js';
import { XamaCommand } from '@xororo/core/commands';

import { User } from '../../../Model/User';
import { DiscordCommandHandler } from '../../Command';
import { interactionAdapter } from './interaction.adapter';

export class XamaCommandAdapter
  extends XamaCommand
  implements DiscordCommandHandler
{
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    return super.exec(interactionAdapter(event));
  }

  protected async incXesques(id: string, username: string) {
    const user =
      (await User.findOne({ uid: id })) ||
      (await User.create({ uid: id, name: username, xesques: 0 }));

    user.xesques = user.xesques + 1;
    await user.save();

    return user.xesques;
  }
}
