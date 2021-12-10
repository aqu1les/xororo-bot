import { Message, CommandInteraction, Client } from 'discord.js';
import { AppCommand } from '../Command';

export class SkipCommand implements AppCommand {
  readonly displayName = 'skip';
  readonly usage = 'skip';
  readonly description = 'Pula a musica que tá tocando';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    // if (event.guild.voice && event.guild.voice.connection) {
    //   const connection = event.guild.voice.connection;
    //   if (connection && connection.dispatcher) {
    //     return connection.player.dispatcher.end();
    //   }
    // }
    // return event.channel.send('como que skipa se n ta tocando nada desgraça');
  }
}
