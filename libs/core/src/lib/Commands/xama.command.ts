import { Interaction } from '.';
import { Command } from './command';

export abstract class XamaCommand extends Command {
  readonly displayName = 'xama';
  readonly usage = 'xama';
  readonly description = 'XAAAAAAAAAAAAAAAAAMA';

  async exec(interaction: Interaction) {
    if (!interaction.user) {
      return;
    }

    const xesques = await this.incXesques(
      interaction.user.id,
      interaction.user.username
    );

    if (xesques === 1) {
      return interaction.reply(`xamou no xesque pela primeira vez!`);
    }

    return interaction.reply(`Você xamou no xesque ${xesques} vezes !`);
  }

  protected abstract incXesques(
    userId: string,
    username: string
  ): Promise<number>;
}
