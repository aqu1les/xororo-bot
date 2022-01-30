import { PingCommand } from '@xororo/core/commands';
import { Message, CommandInteraction, Client } from 'discord.js';
import { DiscordCommandHandler } from '../../Command';
import { interactionAdapter } from './interaction.adapter';

export class PingCommandAdapter
  extends PingCommand
  implements DiscordCommandHandler
{
  readonly interactionOptions = [];

  run(client: Client, event: Message | CommandInteraction) {
    return super.exec(interactionAdapter(event));
  }
}
