import { Message, CommandInteraction, Client } from 'discord.js';
import { ComandosCommand } from '@xororo/core/commands';
import { resolve } from '@xororo/core/providers';

import { CommandsManager } from '../CommandsManager';
import { DiscordCommandHandler } from '../Command';

export class ComandosCommandAdapter
  extends ComandosCommand
  implements DiscordCommandHandler
{
  protected get commands() {
    return resolve(CommandsManager).commands;
  }

  run(client: Client, event: Message | CommandInteraction) {
    return super.exec(event);
  }
}
