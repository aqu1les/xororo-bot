import { Command } from './command';
import { Interaction } from './interaction';

export abstract class PvtCommand extends Command {
  readonly displayName = 'pvt';
  readonly usage = 'pvt';
  readonly description = 'Sei lá, vive mudando';

  protected async exec(interaction: Interaction) {
    if (!interaction.user) {
      return interaction.reply('sai doido');
    }

    const avatarUrl = await this.fetchUserAvatar(interaction.user.id);
    return interaction.reply(avatarUrl);
  }

  protected abstract fetchUserAvatar(userId: string): Promise<string>;
}
