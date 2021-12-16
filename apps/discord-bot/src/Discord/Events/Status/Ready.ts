import { Client } from 'discord.js';
import { EventHandler } from '../EventHandler';
import { DISCORD_ACTIVITY } from 'environment';

export class Ready implements EventHandler {
  async exec(client: Client) {
    console.log(`Logged in as ${client.user?.tag}!`);

    client.user?.setActivity(DISCORD_ACTIVITY, {
      type: 'WATCHING'
    });
  }
}
