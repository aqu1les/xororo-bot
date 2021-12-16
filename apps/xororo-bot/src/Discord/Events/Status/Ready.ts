import { Client } from 'discord.js';
import { CommandsManager } from '../../../Commands/CommandsManager';
import { resolve } from '../../../helpers';
import { EventHandler } from '../EventHandler';

const environment = process.env.NODE_ENV ?? 'production';

export class Ready implements EventHandler {
  private get commandsManager(): CommandsManager {
    return resolve(CommandsManager);
  }

  async exec(client: Client) {
    console.log(`Logged in as ${client.user?.tag}!`);

    client.user?.setActivity(
      environment === 'local'
        ? 'meu dono fazer merda no meu código'
        : 'você comer o cu dos outros',
      {
        type: 'WATCHING'
      }
    );
  }
}
