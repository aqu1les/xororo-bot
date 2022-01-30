import { Message, CommandInteraction, Client } from 'discord.js';
import { DiscordCommandHandler } from '../Command';

export class PingCommand implements DiscordCommandHandler {
  readonly displayName = 'ping';
  readonly usage = 'ping';
  readonly description = 'Pong?';
  readonly interactionOptions = [];

  run(client: Client, event: Message | CommandInteraction) {
    return event.reply('pong');
  }
}
