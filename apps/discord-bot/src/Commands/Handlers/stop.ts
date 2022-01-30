import { DiscordCommandHandler } from '../Command';

export class StopCommand implements DiscordCommandHandler {
  readonly displayName = 'stop';
  readonly usage = 'stop';
  readonly description = 'Para de tocar e vaza do canal de voz';
  readonly interactionOptions = [];

  async run() {
    // if (event.guild.voice && event.guild.voice.connection) {
    //   const { connection } = event.guild.voice;
    //   if (connection && connection.dispatcher) {
    //     event.channel.send('blz, fui de beise');
    //     return event.guild.voice.disconnect();
    //   }
    // }
    // return event.channel.send('tem nada pra parar porra');
  }
}
