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

  /** TODO: definir interface comum */
  interactionOptions: any[] = [];

  /**
   * Execução do comando
   */
  protected abstract exec(interaction: Interaction): unknown;

  /**
   * Validação para ver se o comando pode ser executado
   * (é executado antes de rodar a função `run`)
   */
  validate() {
    return;
  }

  /**
   * Executada após o comando ser executado com sucesso
   */
  success() {
    return;
  }

  /**
   * Executada quando ocorre algum erro durante a execução do comando
   */
  error() {
    return;
  }

  /**
   * Executada após execução da fn `run` (independente de sucesso / erro)
   */
  after() {
    return;
  }
}
