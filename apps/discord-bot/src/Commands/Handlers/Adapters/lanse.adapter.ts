// import ytdl from 'ytdl-core';
import { Message, CommandInteraction, Client } from 'discord.js';
import { LanseCommand } from '@xororo/core/commands';
import { User } from '../../../Model/User';

import { DiscordCommandHandler } from '../../Command';
import { interactionAdapter } from './interaction.adapter';

export class LanseCommandAdapter
  extends LanseCommand
  implements DiscordCommandHandler
{
  readonly interactionOptions = [
    {
      name: 'braba',
      type: 'STRING',
      description: 'vai querer a braba?',
      required: false
    }
  ];

  async run(client: Client, event: Message | CommandInteraction) {
    return super.exec(interactionAdapter(event));
  }

  protected async incBrabas(id: string, username: string): Promise<number> {
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
}
