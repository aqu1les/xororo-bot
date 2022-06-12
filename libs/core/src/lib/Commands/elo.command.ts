import { Command } from './command';
import { Interaction } from './interaction';

export abstract class EloCommand extends Command {
  readonly displayName = 'elo';
  readonly usage = 'elo';
  readonly description = 'Retorna o seu elo no lolzito';

  protected async exec(interaction: Interaction, args: string[]) {
    const username = String(args.join(''));
    const response = await this.fetchUserElo(username);

    return interaction.reply(`${response}`);
  }

  protected abstract fetchUserElo(username: string): Promise<any>;
}
