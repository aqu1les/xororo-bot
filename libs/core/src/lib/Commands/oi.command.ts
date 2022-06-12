import { Command } from './command';
import { Interaction } from './interaction';

export class OiCommand extends Command {
  readonly displayName = 'oi';
  readonly usage = 'oi';
  readonly description = 'Salve?';

  protected exec(interaction: Interaction) {
    return interaction.reply('EAI CARAIO');
  }
}
