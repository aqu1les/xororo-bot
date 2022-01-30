import { ApplicationCommandDataResolvable } from 'discord.js';

import { Injectable } from '@xororo/core/providers';
import { CommandsManager } from '@xororo/core/commands';

import { DiscordCommandHandler } from './Command';
import { COMMANDS_HANDLERS } from './Handlers';

@Injectable()
export class DiscordCommandsManager extends CommandsManager<DiscordCommandHandler> {
  protected COMMANDS_HANDLERS = COMMANDS_HANDLERS;

  forDiscord(): ApplicationCommandDataResolvable[] {
    return [...this.state.entries()].map(([key, props]) => ({
      name: key,
      description: props.description,
      options: props.interactionOptions
    }));
  }
}
