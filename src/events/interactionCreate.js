const Discord = require('discord.js');

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.CommandInteraction} interaction
 */
module.exports = async (client, interaction) => {
  await Promise.all([runCommand(client, interaction)]);
};

/**
 *
 * @param {Discord.Client} client
 * @param {Discord.CommandInteraction} interaction
 */
const runCommand = async (client, interaction) => {
  const command = interaction.commandName;
  const cmd = client.commands.get(command);
  const args = cmd.command.options.map(
    ({ name }) => interaction.options.get(name)?.value
  );

  if (!cmd) return;

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
  } finally {
    if (cmd.after) {
      await cmd.after(client, interaction, args);
    }
  }
};
