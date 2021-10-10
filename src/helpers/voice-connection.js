const {
  getVoiceConnection,
  joinVoiceChannel,
  VoiceConnection
} = require('@discordjs/voice');
const Discord = require('discord.js');

/**
 *
 * @param {Discord.GuildMember} member
 * @returns {boolean}
 */
const memberIsOnVoiceChannel = (member) => member.voice && member.voice.channel;

/**
 *
 * @param {Discord.Guild} guildId
 * @returns {boolean}
 */
const botIsConnected = (guildId) => !!getVoiceConnection(guildId);

/**
 *
 * @param {Discord.Channel} channelA
 * @param {Discord.Channel} channelB
 * @returns {boolean}
 */
const isSameChannel = (channelA, channelB) => channelA.id && channelB.id;

/**
 *
 * @param {Discord.VoiceChannel} channel
 * @param {Discord.TextChannel} textChannel
 * @param {string} message
 *
 * @returns {Promise<Discord.Message>}
 */
const connectOnChannel = async (
  channel,
  textChannel,
  message = 'entrei fodase'
) => {
  await channel.join();

  return await textChannel.send(message);
};

/**
 *
 * @param {string} channelId
 * @param {Discord.Guild} guild
 *
 * @returns {VoiceConnection}
 */
const createVoiceConnection = (channelId, guild) => {
  return joinVoiceChannel({
    channelId,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator
  });
};

module.exports = {
  botIsConnected,
  memberIsOnVoiceChannel,
  connectOnChannel,
  isSameChannel,
  createVoiceConnection
};
