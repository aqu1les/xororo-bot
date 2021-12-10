import { Client, CommandInteraction } from 'discord.js';
import { CommandsManager } from '../../../Commands/CommandsManager';
import { resolve } from '../../../helpers';
import { EventHandler } from '../EventHandler';

export class InteractionCreate implements EventHandler {
  private get commandsManager(): CommandsManager {
    return resolve(CommandsManager);
  }

  async exec(client: Client, interaction: CommandInteraction) {
    await Promise.all([this.runCommand(client, interaction)]);
  }

  async runCommand(client: Client, interaction: CommandInteraction) {
    const command = interaction.commandName;
    const cmd = this.commandsManager.commands[command];
    if (!cmd) return;

    const args = cmd.interactionOptions
      .map(({ name }) => interaction.options.get(name)?.value)
      .filter((v) => !!v) as string[];

    try {
      if (cmd.validate) {
        await cmd.validate(client, interaction, args);
      }

      await cmd.run(client, interaction, args);

      if (cmd.success) {
        await cmd.success(client, interaction, args);
      }
    } catch (err) {
      console.error(err);

      if (cmd.error) {
        await cmd.error(client, interaction, args);
      }
    } finally {
      if (cmd.after) {
        await cmd.after(client, interaction, args);
      }
    }
  }
}
