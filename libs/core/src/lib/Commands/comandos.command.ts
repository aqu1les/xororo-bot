import { Command } from './command';
import { Interaction } from './interaction';

export abstract class ComandosCommand extends Command {
  readonly displayName = 'comandos';
  readonly usage = 'comandos';
  readonly description = 'Lista todos os comandos do bot';

  protected abstract get commands(): { [key: string]: any };

  protected exec(interaction: Interaction) {
    const commands = [...Object.keys(this.commands)]
      .map((key) => `!${key}`)
      .join(' ');
    const message = `Os comandos são: ${commands}`;

    return interaction.reply(message);
  }
}
