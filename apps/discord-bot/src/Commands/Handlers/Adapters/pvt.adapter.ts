import { PvtCommand } from '@xororo/core/commands';
import { Message, CommandInteraction, Client } from 'discord.js';
import { DiscordCommandHandler } from '../../Command';
import { interactionAdapter } from './interaction.adapter';

export class PvtCommandAdapter
  extends PvtCommand
  implements DiscordCommandHandler
{
  readonly interactionOptions = [];
  private client?: Client;

  async run(client: Client, event: Message | CommandInteraction) {
    this.client = client;

    return super.exec(interactionAdapter(event));
  }

  protected async fetchUserAvatar(userId: string): Promise<string> {
    return (
      (await this.client?.users
        .fetch(userId)
        .then((fetchedUser) => fetchedUser.displayAvatarURL())
        .catch(() => 'oxe deu algum erro bixo')) ?? 'oxe deu algum erro bixo'
    );
  }
}
