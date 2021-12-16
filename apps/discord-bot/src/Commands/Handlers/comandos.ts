import { CommandsManager } from '../CommandsManager';
import { Message, CommandInteraction, Client } from 'discord.js';
import { AppCommand } from '../Command';
import { resolve } from '../../Helpers';

export class CommandsListCommand implements AppCommand {
  readonly displayName = 'comandos';
  readonly usage = 'comandos';
  readonly description = 'Lista todos os comandos do bot';
  readonly interactionOptions = [];

  private get commandsManager(): CommandsManager {
    return resolve(CommandsManager);
  }

  async run(client: Client, event: Message | CommandInteraction) {
    const commands = [...Object.keys(this.commandsManager.commands)]
      .map((key) => `!${key}`)
      .join(' ');
    const message = `Os comandos são: ${commands}`;

    event.reply(message);
  }
}
