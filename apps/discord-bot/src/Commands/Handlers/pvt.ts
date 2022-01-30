import { Message, CommandInteraction, Client } from 'discord.js';
import { DiscordCommandHandler } from '../Command';

export class PvtCommand implements DiscordCommandHandler {
  readonly displayName = 'pvt';
  readonly usage = 'pvt';
  readonly description = 'Sei lá';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    const user = event.member?.user;

    if (!user) {
      return event.reply('sai doido');
    }

    const avatarUrl = await client.users
      .fetch(user.id)
      .then((fetchedUser) => fetchedUser.displayAvatarURL())
      .catch(() => 'oxe deu algum erro bixo');

    return event.reply(avatarUrl);
  }
}
