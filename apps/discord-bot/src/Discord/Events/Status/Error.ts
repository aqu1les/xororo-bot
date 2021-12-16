import { Client } from 'discord.js';
import { EventHandler } from '../EventHandler';

export class Error implements EventHandler {
  async exec(client: Client, error: any) {
    console.log(error);
  }
}
