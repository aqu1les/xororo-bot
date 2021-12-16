import ytdl from 'ytdl-core';
import ytsr from 'ytsr';

import ytb from '../../Adapters/ytb';
import PlaylistFactory from '../../Features/playlist';
const playlist = PlaylistFactory();
import createEmbed from '../../Adapters/embed';
import { millisToMinutes } from '../../Adapters/utils';
import {
  memberIsOnVoiceChannel,
  botIsConnected,
  createVoiceConnection
} from '../../Helpers/voice-connection';
import { playOnVoiceConnection } from '../../Features/play-on-voice-channel';
import {
  Message,
  CommandInteraction,
  Client,
  User,
  TextBasedChannelFields,
  GuildMember
} from 'discord.js';
import { AppCommand } from '../Command';

let author: User | null = null;

export class PlayCommand implements AppCommand {
  readonly displayName = 'play';
  readonly usage = 'play';
  readonly description = 'Toca musica né irmão';
  readonly interactionOptions = [
    {
      name: 'music',
      type: 'STRING',
      description: 'Link da música ou o nome a ser pesquisado',
      required: false
    }
  ];

  async run(
    client: Client,
    event: Message | CommandInteraction,
    args: string[]
  ) {
    const guild = event.guild;
    const channel = event.channel;

    if (!guild || !channel) {
      return;
    }

    const member = event.member as GuildMember;
    const guildId = guild.id;

    if (args.length === 0) {
      if (!botIsConnected(guild)) {
        return event.reply(
          'use !play <nome da musica> ou !play <link da musica no youtube> para tocar'
        );
      }

      /** GET SUBSCRIPTION TO PAUSE */
      // if (event.guild.voice.connection.player) {
      //   event.guild.voice.player.dispatcher.resume();
      //   return event.react('▶️');
      // }
      return;
    }

    if (!memberIsOnVoiceChannel(member)) {
      event.reply('vai pra um canal de voz primeiro corno');
      return;
    }

    author = author ?? (await client.users.fetch('246470177376567297'));

    if ('deferReply' in event) {
      await event.reply('to pensando aqui perai');
    }

    try {
      const result = await handleArguments(
        args,
        event.channel as TextBasedChannelFields,
        guildId
      );

      if (!botIsConnected(guild)) {
        const connection = createVoiceConnection(member.id, guild);

        return playOnVoiceConnection(
          connection,
          event.channel,
          guildId,
          author
        );
      }

      if (result) {
        const clientResponse = createEmbed(
          `Música adicionada à playlist`,
          '#e80a21',
          result.title,
          (result as any).link || result.url,
          (result as any).thumbnail
        );

        const fn =
          'editReply' in event && event.deferred
            ? event.editReply
            : event.reply;

        return fn(clientResponse as any);
      }
    } catch (error: any) {
      const fn =
        'editReply' in event && event.deferred ? event.editReply : event.reply;
      console.error(error);
      return fn('foi mal viado, deu algum erro aqui');
    }
  }
}

async function handlePlaylist(
  playlistURL: string,
  serverID: string
): Promise<number> {
  return (await ytb.fetchPlaylist(playlistURL)).map((music: any) =>
    playlist.addMusic(music, serverID)
  ).length;
}

async function handleYtbSearch(
  keywords: string,
  serverID: string
): Promise<ytsr.Video> {
  const music = await ytb.search(keywords);
  playlist.addMusic(music, serverID);
  return music as ytsr.Video;
}

async function handleYtbLink(URL: string, serverID: string): Promise<any> {
  const ytb_music = await ytdl.getBasicInfo(URL);
  const music = {
    thumbnail: ytb_music.thumbnail_url,
    link: URL,
    title: (ytb_music as any).title,
    duration: millisToMinutes((ytb_music as any).length_seconds * 1000)
  };
  playlist.addMusic(music, serverID);
  return music;
}

async function handleArguments(
  args: string[],
  channel: TextBasedChannelFields,
  guildId: string
): Promise<ytsr.Video | undefined> {
  if (args.length === 1 && ytb.validateURL(args[0])) {
    try {
      const totalMusics = await handlePlaylist(
        ytb.validateURL(args[0]) as string,
        guildId
      );

      channel.send(`${totalMusics} músicas adicionadas à playlist.`);
    } catch (e) {
      channel.send('deu erro adicionando as musicas da playlist parsero');
    }
  } else if (args.length === 1 && ytdl.validateURL(args[0])) {
    await handleYtbLink(args[0], guildId);
  } else {
    return await handleYtbSearch(args.join(' '), guildId);
  }

  return void 0;
}
