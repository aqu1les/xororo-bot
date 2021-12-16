// import { Message, CommandInteraction, Client } from 'discord.js';
// import { millisToMinutes } from '../../Adapters/utils';
// import PlaylistFactory from '../../features/playlist';
// const playlist = PlaylistFactory();

import { AppCommand } from '../Command';

export class QueueCommand implements AppCommand {
  readonly displayName = 'queue';
  readonly usage = 'queue';
  readonly description = 'Mostra a playlist atual';
  readonly interactionOptions = [];

  run() {
    // if (!event.guild.voice || !event.guild.voice.connection) {
    //   return event.reply('a playlist ta vazia meu guerreiro');
    // }
    // const songs = [...playlist.getPlaylist(event.guild.id)];
    // const dispatcher = event.guild.voice.connection.dispatcher;
    // let response = `Música atual: ${songs[0].title} - ${millisToMinutes(
    //   dispatcher.streamTime
    // )} / ${songs[0].duration}`;
    // songs.shift();
    // songs.forEach(
    //   (song, index) =>
    //     (response += `\n${index + 1} - ${song.title} - 0:00 / ${song.duration}`)
    // );
    // return event.channel?.send(response);
  }
}
