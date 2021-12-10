import { Message, CommandInteraction, Client } from 'discord.js';

export interface AppCommand {
  displayName: string;
  usage: string;
  description: string;
  interactionOptions: any[];

  run(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ): unknown;

  validate?(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ): unknown;

  success?(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ): unknown;

  error?(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ): unknown;

  after?(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ): unknown;
}
