import { Message, CommandInteraction, Client } from 'discord.js';
import { CuCommand } from '@xororo/core/commands';
import { User } from '../../../Model/User';
import { DiscordCommandHandler } from '../../Command';
import { interactionAdapter } from './interaction.adapter';

export class CuCommandAdapter
  extends CuCommand
  implements DiscordCommandHandler
{
  readonly interactionOptions = [
    {
      name: 'alvo',
      type: 'STRING',
      description: 'A pessoa que você gostaria de comer',
      required: true
    }
  ];

  run(client: Client, event: Message | CommandInteraction, args: string[]) {
    return super.exec(interactionAdapter(event), args);
  }

  protected async incrementCus(
    id: string,
    username: string,
    target_id: string
  ) {
    const user = await User.findOne({ uid: id });
    if (user) {
      user.cus_comidos = [...user.cus_comidos, target_id];
      await user.save();
    } else {
      await User.create({ uid: id, name: username });
    }
  }

  protected findTaggedUser(args: string[]): string | undefined {
    const userTagged = args[0];

    if (userTagged.substring(0, 2) !== '<@') {
      return undefined;
    }

    return userTagged;
  }
}
