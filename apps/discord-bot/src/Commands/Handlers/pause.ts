// import { getVoiceConnection } from '@discordjs/voice';
// import { Message, CommandInteraction, Client } from 'discord.js';
import { DiscordCommandHandler } from '../Command';

export class PauseCommand implements DiscordCommandHandler {
  readonly displayName = 'pause';
  readonly usage = 'pause';
  readonly description = 'Pausa a música que está tocando';
  readonly interactionOptions = [];

  async run() {
    // if (!event.guild!.voice || !event.guild!.voice.connection) {
    //   return event.reply('tem nada pra pausar carai');
    // }
    // const connection = getVoiceConnection(event.guild!.id);
    // const dispatcher = connection.dispatcher;
    // if (dispatcher) {
    //   if (dispatcher.paused) {
    //     dispatcher.resume();
    //     'react' in event && event.react('▶️');
    //   }
    //   dispatcher.pause();
    //   'react' in event && event.react('⏸️');
    // }
  }
}
