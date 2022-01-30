import { Interaction } from './interaction';

export abstract class Command {
  /**
   * Nome do comando
   */
  abstract displayName: string;

  /**
   * Palavra após o prefixo que ativará o comando, ex: !oi
   */
  abstract usage: string;

  /**
   * Breve descrição do que o comando faz
   */
  abstract description: string;

  /**
   * Execução do comando
   */
  protected abstract exec(interaction: Interaction, args?: string[]): unknown;
}
