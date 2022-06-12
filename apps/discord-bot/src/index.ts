// MUST RUN BEFORE EVERYTHING
import { run } from './Config';
run();

import { resolve } from '@xororo/core/providers';
import { DatabaseConnection } from './Database';
import { DiscordCommandsManager } from './Commands/DiscordCommandsManager';
import { eventsManager } from './Discord/Events/EventsManager';
import { DiscordClient } from './Discord/Client';

export class App {
  private databaseConnection = resolve(DatabaseConnection);

  async init() {
    try {
      const commandsManager = resolve(DiscordCommandsManager);
      const discordClient = new DiscordClient();

      await Promise.all([
        commandsManager.load(),
        this.databaseConnection.init(),
        eventsManager.register(discordClient.client),
        discordClient.login()
      ]);

      discordClient.setCommands();
    } catch (error) {
      console.log('deu problema inicializando');
      this.shutdown();

      console.error(error);
    }
  }

  async shutdown() {
    console.info('### Shutting down app');
    await this.databaseConnection.close();
  }
}

const app = new App();
app.init();

process.on('SIGHUP', () => {
  console.log('SIGHUP happened!');

  app.shutdown().then(() => process.exit(128 + 1));
});

process.on('SIGINT', () => {
  console.log('SIGINT happened!');

  app.shutdown().then(() => process.exit(128 + 2));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM happened!');

  app.shutdown().then(() => process.exit(128 + 15));
});
