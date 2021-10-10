const ytdl = require('ytdl-core');
const ytsr = require('ytsr');
const Discord = require('discord.js');

const ytb = require('../adapters/ytb');
const playlist = require('../features/playlist')();
const createEmbed = require('../adapters/embed');
const { millisToMinutes } = require('../adapters/utils');
const {
  memberIsOnVoiceChannel,
  botIsConnected,
  createVoiceConnection
} = require('../helpers/voice-connection');
const { playOnVoiceConnection } = require('../features/play-on-voice-channel');

/**
 * @type {Discord.User}
 */
let author = null;

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event, args) => {
    const guildId = event.guild.id;

    if (args.length === 0) {
      if (!botIsConnected(guildId)) {
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

    if (!memberIsOnVoiceChannel(event.member)) {
      event.reply('vai pra um canal de voz primeiro corno');
      return;
    }

    if (!author) {
      author = await client.users.fetch('246470177376567297');
    }

    handleArguments(args, event.channel, guildId)
      .then((music) => {
        if (!botIsConnected(guildId)) {
          const connection = createVoiceConnection(
            event.member.voice.channel.id,
            event.guild
          );

          return playOnVoiceConnection(connection, event, guildId, author);
        }

        if (music) {
          const clientResponse = createEmbed(
            `Música adicionada à playlist`,
            '#e80a21',
            music.title,
            music.link || music.url,
            music.thumbnail
          );

          return event.channel.send(clientResponse);
        }
      })
      .catch((error) => {
        console.error(error);
        return event.reply('foi mal viado, deu algum erro aqui');
      });
  },
  get command() {
    return {
      name: 'play',
      usage: 'play',
      description: 'Toca musica né irmão',
      options: [
        {
          name: 'music',
          type: 'STRING',
          description: 'Link da música ou o nome a ser pesquisado',
          required: false
        }
      ]
    };
  }
};

/**
 *
 * @param {string} playlistURL
 * @param {string} serverID
 * @returns {Promise<number>} playlist length
 */
async function handlePlaylist(playlistURL, serverID) {
  return await ytb
    .fetchPlaylist(playlistURL)
    .map((music) => playlist.addMusic(music, serverID)).length;
}

/**
 *
 * @param {string} keywords
 * @param {string} serverID
 * @returns {Promise<ytsr.Video>} music found
 */
async function handleYtbSearch(keywords, serverID) {
  const music = await ytb.search(keywords);
  playlist.addMusic(music, serverID);
  return music;
}

/**
 *
 * @param {string} URL
 * @param {string} serverID
 * @returns {Promise<any>}
 */
async function handleYtbLink(URL, serverID) {
  const ytb_music = await ytdl.getBasicInfo(URL);
  const music = {
    thumbnail: ytb_music.thumbnail_url,
    link: URL,
    title: ytb_music.title,
    duration: millisToMinutes(ytb_music.length_seconds * 1000)
  };
  playlist.addMusic(music, serverID);
  return music;
}

/**
 *
 * @param {string[]} args
 * @param {Discord.TextBasedChannelFields} channel
 * @param {string} guildId
 * @returns {Promise<ytsr.Video | undefined>}
 */
async function handleArguments(args, channel, guildId) {
  if (args.length === 1 && ytb.validateURL(args[0])) {
    try {
      const totalMusics = await handlePlaylist(ytb.validateURL(url), guildId);

      channel.send(`${totalMusics} músicas adicionadas à playlist.`);
    } catch (e) {
      channel.send('deu erro adicionando as musicas da playlist parsero');
    }
  } else if (args.length === 1 && ytdl.validateURL(args[0])) {
    await handleYtbLink(args[0], guildId);
  } else {
    return await handleYtbSearch(args.join(' '), guildId);
  }

  return;
}
