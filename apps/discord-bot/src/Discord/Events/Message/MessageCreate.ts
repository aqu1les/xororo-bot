import { Client, Message } from 'discord.js';
import fs from 'fs-extra';
import { CommandsManager } from '../../../Commands/CommandsManager';
import { resolve } from '../../../Helpers';
import { EventHandler } from '../EventHandler';

const commandPrefix = '!';
const commandPrefix2 = '/';

export class MessageCreate implements EventHandler {
  private get commandsManager(): CommandsManager {
    return resolve(CommandsManager);
  }

  async exec(client: Client, event: Message) {
    const member = event.member;
    if (member && 'bot' in member) {
      return;
    }

    const msg = ['Q', 'q', 'que', 'que?', 'q?', 'QUE'];

    msg.map((q) => {
      if (event.content.toLowerCase() === q) {
        event.channel.send('pau no seu cu :microphone: ');
      }
    });

    const test = event.content.substring(
      event.content.length - 2,
      event.content.length - 1
    );

    if (test === 'ão' && member?.user.username !== client.user?.username) {
      return event.channel.send('Meu pau na sua mão');
    }

    if (
      event.content
        .toLowerCase()
        .substring(event.content.length - 5, event.content.length - 1) ===
      'noite'
    ) {
      return event.channel.send('Boa noite corno');
    }

    await Promise.all([this.runCommand(client, event)]);
  }

  textIsCommand(text: string) {
    return text.startsWith(commandPrefix) || text.startsWith(commandPrefix2);
  }

  async runCommand(client: Client, message: Message) {
    const isCommand = this.textIsCommand(message.content);
    if (!isCommand) return;

    const msg = message.content;

    const args = msg.slice(1).trim().split(' ');
    args.shift();

    const command = msg.substring(1, msg.length).split(' ')[0];
    const cmd = this.commandsManager.commands[command];
    if (!cmd) return;

    try {
      // TODO: armazenar logs no mongodb

      // const dateObj = new Date(Date.now());
      // const date = `${dateObj.getFullYear()}-${
      //   dateObj.getMonth() + 1
      // }-${dateObj.getDate()}`;

      // const logmsg = `[#LOG]: ${date} - ${message.member?.user?.username} (${message.member?.id}) executou o comando: ${cmd.displayName}`;
      // const name = date + '-log';

      // if (!fs.existsSync(`src/logs`)) {
      //   fs.mkdirSync(`src/logs`);
      // }

      // fs.appendFile(
      //   `src/logs/${name}.txt`,
      //   `${logmsg} ${args.join(' ') || ''} \n`,
      //   (err: any) => {
      //     if (err) {
      //       throw err;
      //     }

      //     console.log(logmsg);
      //   }
      // );

      if (cmd.validate) {
        await cmd.validate(client, message, args);
      }
      await cmd.run(client, message, args);
      if (cmd.success) {
        await cmd.success(client, message, args);
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (cmd.after) {
        await cmd.after(client, message, args);
      }
    }
  }
}
