import { ApplicationCommandDataResolvable } from 'discord.js';

import { Injectable } from '@xororo/core/providers';
import { DiscordCommandHandler } from './Command';
import { COMMANDS_HANDLERS } from './Handlers';

@Injectable()
export class CommandsManager {
  private readonly state = new Map<string, DiscordCommandHandler>();
  static instance: CommandsManager;

  constructor() {
    if (CommandsManager.instance) {
      return CommandsManager.instance;
    }

    CommandsManager.instance = this;
  }

  get commands(): { [key: string]: DiscordCommandHandler } {
    const response: {
      [key: string]: DiscordCommandHandler;
    } = {};

    [...this.state.entries()].forEach(
      ([key, value]) => (response[key] = value)
    );

    return response;
  }

  forDiscord(): ApplicationCommandDataResolvable[] {
    return [...this.state.entries()].map(([key, props]) => ({
      name: key,
      description: props.description,
      options: props.interactionOptions
    }));
  }

  async load() {
    return new Promise((resolve, reject) => {
      try {
        COMMANDS_HANDLERS.forEach((commandConstructor) => {
          try {
            const commandInstance = new commandConstructor();
            this.set(commandInstance.displayName, commandInstance);
          } catch (e) {
            console.log(`Deu ruim inicializando comando ${commandConstructor}`);
            console.error(e);
            throw e;
          }
        });

        resolve(COMMANDS_HANDLERS.map((command) => command.name));
      } catch (e) {
        reject(e);
      }
    });
  }

  private set(commandName: string, commandInstance: DiscordCommandHandler) {
    this.state.set(commandName, commandInstance);
  }
}
