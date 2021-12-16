// MUST RUN BEFORE EVERYTHING
import { run } from './Config';
run();

import { DatabaseConnection } from './Database';
import { CommandsManager } from './Commands/CommandsManager';
import { eventsManager } from './Discord/Events/EventsManager';
import { DiscordClient } from './Discord/Client';
import { resolve } from './helpers';

export class App {
  async init() {
    try {
      const commandsManager = resolve(CommandsManager);
      const databaseConnection = resolve(DatabaseConnection);
      const discordClient = new DiscordClient();

      await Promise.all([
        commandsManager.load(),
        databaseConnection.init(),
        eventsManager.register(discordClient.client),
        discordClient.login()
      ]);

      discordClient.setCommands();
    } catch (error) {
      console.log('deu problema inicializando');
      console.error(error);
    }
  }
}

const app = new App();
app.init();
