import { Command } from './command';
import { Interaction } from './interaction';

export abstract class LanseCommand extends Command {
  readonly displayName = 'lanse';
  readonly usage = 'lanse';
  readonly description = 'Te lansa uma braba';

  protected async exec(interaction: Interaction) {
    if (!interaction.user) {
      return;
    }

    const brabas = await this.incBrabas(
      interaction.user.id,
      interaction.user.username
    );

    if (brabas === 1) {
      return interaction.reply(`lansou a braba pela primeira vez!`);
    }

    return interaction.reply(`Você lansou a braba ${brabas} vezes, fdp`);
  }

  protected abstract incBrabas(id: string, username: string): Promise<number>;
}
