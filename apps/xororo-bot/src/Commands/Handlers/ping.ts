import { Message, CommandInteraction, Client } from 'discord.js';
import { AppCommand } from '../Command';

export class PingCommand implements AppCommand {
  readonly displayName = 'ping';
  readonly usage = 'ping';
  readonly description = 'Pong?';
  readonly interactionOptions = [];

  run(client: Client, event: Message | CommandInteraction) {
    return event.reply('pong');
  }
}
