import { Message, CommandInteraction, Client } from 'discord.js';
import { AppCommand } from '../Command';

export class ResumeCommand implements AppCommand {
  readonly displayName = 'resume';
  readonly usage = 'resume';
  readonly description = 'Da play na musica pausada';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    // if (!event.guild.voice || !event.guild.voice.connection) {
    //   return event.reply('There is nothing to resume :)');
    // }
    // const connection = event.guild.voice.connection;
    // if (connection.player) {
    //   const dispatcher = connection.dispatcher;
    //   if (dispatcher.paused) {
    //     dispatcher.resume();
    //     event.react('▶️');
    //   }
    // }
  }
}
