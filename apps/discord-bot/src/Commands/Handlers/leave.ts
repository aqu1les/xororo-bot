import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import {
  botIsConnected,
  isSameChannel,
  memberIsOnVoiceChannel
} from '../../Helpers/voice-connection';
import PlaylistFactory from '../../Features/playlist';
const playlist = PlaylistFactory();
import { DiscordCommandHandler } from '../Command';

export class LeaveCommand implements DiscordCommandHandler {
  readonly displayName = 'leave';
  readonly usage = 'leave';
  readonly description = 'Sai do seu canal de voz';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    const member = event.member as GuildMember;
    const guild = event.guild;
    const channel = member.voice.channel;

    if (!guild || !channel) {
      return;
    }

    if (!botIsConnected(guild)) {
      return event.reply(`sai tu`);
    }

    if (!memberIsOnVoiceChannel(member)) {
      return event.reply(`se fude porra`);
    }

    const connection = getVoiceConnection(guild.id);
    const channelMock = { id: connection?.joinConfig.channelId };

    if (!isSameChannel(channelMock as any, channel)) {
      return event.reply(
        `tu nem ta nesse canal de voz amigão, me deixa em paz`
      );
    }

    connection?.disconnect();
    playlist.setPlaylist(guild.id);

    return event.reply(`bejo`);
  }
}
