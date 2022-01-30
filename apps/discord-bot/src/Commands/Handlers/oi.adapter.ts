import { Message, CommandInteraction, Client } from 'discord.js';
import { OiCommand } from '@xororo/core/commands';
import { DiscordCommandHandler } from '../Command';
import { interactionAdapter } from './interaction.adapter';

export class OiCommandAdapter
  extends OiCommand
  implements DiscordCommandHandler
{
  interactionOptions: any[] = [];

  run(client: Client, event: Message | CommandInteraction) {
    return super.exec(interactionAdapter(event));
  }
}
