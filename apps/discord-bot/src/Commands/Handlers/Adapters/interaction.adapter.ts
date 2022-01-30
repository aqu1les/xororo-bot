import { CommandInteraction, Message } from 'discord.js';
import { Interaction } from '@xororo/core/commands';

export const interactionAdapter = (
  event: Message | CommandInteraction
): Interaction => {
  return Object.assign(event, {
    user: event.member?.user
  });
};
