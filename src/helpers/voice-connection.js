const Discord = require('discord.js');

/**
 *
 * @param {Discord.GuildMember} member
 * @returns {boolean}
 */
const memberIsOnVoiceChannel = (member) => member.voice && member.voice.channel;

/**
 *
 * @param {Discord.Guild} guild
 * @returns {boolean}
 */
const botIsConnected = (guild) => guild.voice && guild.voice.channel;

/**
 *
 * @param {Discord.Channel} channel1
 * @param {Discord.Channel} channel2
 * @returns {boolean}
 */
const isSameChannel = (channel1, channel2) => channel1.id && channel2.id;

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

module.exports = {
  botIsConnected,
  memberIsOnVoiceChannel,
  connectOnChannel,
  isSameChannel
};
