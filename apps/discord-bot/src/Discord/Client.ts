import { Client, Intents } from 'discord.js';
import { CommandsManager } from '../Commands/CommandsManager';
import { resolve } from '@xororo/core/providers';

export class DiscordClient {
  client = new Client({
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_VOICE_STATES
    ]
  });

  private get commandsManager(): CommandsManager {
    return resolve(CommandsManager);
  }

  async login() {
    return this.client.login(process.env.DISCORD_SECRET);
  }

  setCommands() {
    this.client.guilds.cache.each((guild) => {
      this.client.application?.commands
        .set(this.commandsManager.forDiscord(), guild.id)
        .catch(console.error);
    });
  }
}
