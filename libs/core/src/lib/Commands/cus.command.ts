import { Command } from './command';
import { Interaction } from './interaction';

export abstract class CusCommand extends Command {
  readonly displayName = 'cus';
  readonly usage = 'cus';
  readonly description = 'Lista quantos cus você já comeu';

  protected async exec(interaction: Interaction) {
    if (!interaction.user) {
      return;
    }

    return interaction.reply(
      await this.getCusComidos(interaction.user.id, interaction.user.username)
    );
  }

  protected abstract getCusComidos(
    id: string,
    username: string
  ): Promise<string>;
}
