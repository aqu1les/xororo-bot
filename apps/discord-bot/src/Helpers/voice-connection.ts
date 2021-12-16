import {
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnection,
  VoiceConnectionStatus
} from '@discordjs/voice';
import Discord from 'discord.js';

export const memberIsOnVoiceChannel = (member: Discord.GuildMember): boolean =>
  !!(member.voice && member.voice.channel);

export const botIsConnected = (guild: Discord.Guild): boolean => {
  const connection = getVoiceConnection(guild.id);
  if (!connection) {
    return false;
  }

  return connection.state.status !== VoiceConnectionStatus.Disconnected;
};

export const isSameChannel = (
  channelA: Discord.Channel,
  channelB: Discord.Channel
): boolean => !!(channelA.id && channelB.id && channelA.id === channelB.id);

export const connectOnChannel = async (
  channel: Discord.VoiceChannel,
  textChannel: Discord.TextChannel,
  message = 'entrei fodase'
): Promise<Discord.Message> => {
  // await channel.join(); ?? FIX

  return await textChannel.send(message);
};

export const createVoiceConnection = (
  channelId: string,
  guild: Discord.Guild
): VoiceConnection => {
  return joinVoiceChannel({
    channelId,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator as any
  });
};
