import Discord from 'discord.js';
import { VoiceConnection } from '@discordjs/voice';
import ytdl from 'ytdl-core';

import createEmbed from '../Adapters/embed';
import PlaylistFactory from './playlist';
const playlist = PlaylistFactory();

export async function playOnVoiceConnection(
  connection: VoiceConnection,
  textChannel: Discord.TextBasedChannels,
  guildId: string,
  author: Discord.User
) {
  try {
    const music = playlist.getFirstMusic(guildId);

    const clientResponse = createEmbed(
      `Vo toca essa braba aqui`,
      '#e80a21',
      music.title,
      music.link || music.url,
      music.thumbnail,
      {
        text: author?.username ?? 'aqu1les',
        icon: author?.avatarURL() || 'https://i.imgur.com/FYaQiTu.jpg'
      },
      true
    );

    textChannel.send({ embeds: [clientResponse] });
    const playableData = ytdl(music.link || music.url, {
      filter: 'audio'
    });

    /**
     * TODO: CREATE AUDIO PLAYER
     */
    const dispatcher = (connection as any).play(playableData);
    dispatcher.setVolume(1);

    dispatcher.on('error', (e: any) => {
      console.log(e);
    });

    dispatcher.on('end', () => {
      playlist.popMusic(guildId);

      if (playlist.getPlaylistLength(guildId) === 0) {
        return connection.disconnect();
      }

      playOnVoiceConnection(connection, textChannel, guildId, author);
    });

    (connection as any).on('disconnect', () => {
      playlist.setPlaylist(guildId);
    });
  } catch (e) {
    connection.disconnect();
    connection.destroy(true);
    textChannel.send(`Deu algum erro aqui viado`);
    console.error(e);
  }
}
