import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
import { getVoiceConnection } from '@discordjs/voice';
import {
  botIsConnected,
  isSameChannel,
  memberIsOnVoiceChannel
} from '../../Helpers/voice-connection';
import PlaylistFactory from '../../Features/playlist';
const playlist = PlaylistFactory();
import { AppCommand } from '../Command';

export class LeaveCommand implements AppCommand {
  readonly displayName = 'leave';
  readonly usage = 'leave';
  readonly description = 'Sai do seu canal de voz';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    const member = event.member as GuildMember;

    if (!botIsConnected(event.guild!)) {
      return event.reply(`sai tu`);
    }

    if (!memberIsOnVoiceChannel(member)) {
      return event.reply(`se fude porra`);
    }

    const connection = getVoiceConnection(event.guild!.id);
    const channelMock = { id: connection?.joinConfig.channelId };

    if (!isSameChannel(channelMock as any, member.voice.channel!)) {
      return event.reply(
        `tu nem ta nesse canal de voz amigão, me deixa em paz`
      );
    }

    connection?.disconnect();
    playlist.setPlaylist(event.guild!.id);

    return event.reply(`bejo`);
  }
}
