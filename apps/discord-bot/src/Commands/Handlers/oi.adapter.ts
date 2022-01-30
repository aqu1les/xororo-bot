import { Message, CommandInteraction, Client } from 'discord.js';
import { OiCommand } from '@xororo/core/commands';
import { DiscordCommandHandler } from '../Command';

export class OiCommandAdapter
  extends OiCommand
  implements DiscordCommandHandler
{
  run(client: Client, event: Message | CommandInteraction) {
    return super.exec(event);
  }
}
