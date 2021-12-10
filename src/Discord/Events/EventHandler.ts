import { Client } from 'discord.js';

export interface EventHandler {
  exec(client: Client, event: any, args: string[]): void;
}
