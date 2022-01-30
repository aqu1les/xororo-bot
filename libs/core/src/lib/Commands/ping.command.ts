import { Command } from './command';
import { Interaction } from './interaction';

export class PingCommand extends Command {
  readonly displayName = 'ping';
  readonly usage = 'ping';
  readonly description = 'Pong?';

  protected exec(interaction: Interaction) {
    return interaction.reply('pong');
  }
}
