import { Command } from './command';
import { Interaction } from './interaction';

export abstract class CuCommand extends Command {
  readonly displayName = 'cu';
  readonly usage = 'cu';
  readonly description =
    'Calcula a porcentagem de chances que você tem de comer o cu de alguém';

  protected async exec(interaction: Interaction, args: string[] = []) {
    if (!interaction.user) {
      return;
    }

    if (args.length === 0) {
      return interaction.reply(
        ' marque a pessoa que você gostaria de comer o cu.'
      );
    }
    const taggedUser = this.findTaggedUser(args);
    if (!taggedUser) {
      return interaction.reply(
        ' por favor marque a pessoa que você gostaria de comer o cu.'
      );
    }

    const chances = this.getPercentageChances(0, 101);
    let response = ` você tem ${chances}% de chances de comer o cu de ${taggedUser}.`;

    if (chances >= 100) {
      await this.incrementCus(
        interaction.user.id,
        interaction.user.username,
        taggedUser
      );

      response = ` com 100% de chances você comeu o cu de ${args}. Parabéns!`;
    }

    return interaction.reply(response);
  }

  protected getPercentageChances(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min)) + min;
  }

  protected abstract findTaggedUser(args: string[]): string | undefined;

  protected abstract incrementCus(
    id: string,
    username: string,
    target_id: string
  ): Promise<void>;
}
