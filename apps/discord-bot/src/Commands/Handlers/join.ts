import {
  memberIsOnVoiceChannel,
  botIsConnected,
  createVoiceConnection
} from '../../Helpers/voice-connection';

import { Message, CommandInteraction, Client, GuildMember } from 'discord.js';
import { AppCommand } from '../Command';

export class JoinCommand implements AppCommand {
  readonly displayName = 'join';
  readonly usage = 'join';
  readonly description = 'Entra no seu canal de voz';
  readonly interactionOptions = [];

  async run(client: Client, event: Message | CommandInteraction) {
    const member = event.member as GuildMember;
    const guild = event.guild;
    const channel = member.voice.channel;

    if (!guild || !channel) {
      return;
    }

    if (!memberIsOnVoiceChannel(member)) {
      return event.reply(
        `vo entrar aonde? tu n ta em nenhum canal de voz diabo`
      );
    }

    if (!botIsConnected(guild)) {
      event.reply('Entrando...');
      return createVoiceConnection(channel.id, guild);
    }

    return event.reply('to ocupado, da licença');
  }
}
