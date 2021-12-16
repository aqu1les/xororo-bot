import { Message, CommandInteraction, Client } from 'discord.js';
import { AppCommand } from '../Command';

export class OiCommand implements AppCommand {
  readonly displayName = 'oi';
  readonly usage = 'oi';
  readonly description = 'Salve?';
  readonly interactionOptions = [];

  run(client: Client, event: Message | CommandInteraction) {
    return event.reply('EAI CARAIO');
  }
}
