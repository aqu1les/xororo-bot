import { Command } from './command';

export abstract class CommandsManager<T extends Omit<Command, 'exec'> = any> {
  protected readonly state = new Map<string, T>();
  protected COMMANDS_HANDLERS: {
    new (): T;
  }[] = [];

  static instance: CommandsManager;

  constructor() {
    if (CommandsManager.instance) {
      return CommandsManager.instance;
    }

    CommandsManager.instance = this;
  }

  get commands(): { [key: string]: T } {
    const response: {
      [key: string]: T;
    } = {};

    [...this.state.entries()].forEach(
      ([key, value]) => (response[key] = value)
    );

    return response;
  }

  async load() {
    return new Promise<string[]>((resolve, reject) => {
      try {
        this.COMMANDS_HANDLERS.forEach((commandConstructor) => {
          try {
            const commandInstance = new commandConstructor();
            this.set(commandInstance.displayName, commandInstance);
          } catch (e) {
            console.log(`Deu ruim inicializando comando ${commandConstructor}`);
            console.error(e);
            throw e;
          }
        });

        resolve(this.COMMANDS_HANDLERS.map((command) => command.name));
      } catch (e) {
        reject(e);
      }
    });
  }

  protected set(commandName: string, commandInstance: T) {
    this.state.set(commandName, commandInstance);
  }
}
