const fs = require('fs-extra');

async function getFormattedCommands() {
  const cmds = await fs.readdir('src/commands');

  const formattedCommands = cmds.reduce(
    (acc, cmd) => [...acc, `!${cmd.split('.')[0]}`],
    []
  );

  return formattedCommands;
}

module.exports = {
  /**
   *
   * @param {Discord.Client} client
   * @param {Discord.Message | Discord.CommandInteraction} event
   * @param {string[]} args
   */
  run: async (client, event, args) => {
    event.member.send(await getFormattedCommands());
  },
  get command() {
    return {
      name: 'comandos',
      usage: 'comandos',
      description: 'Lista todos os comandos do bot'
    };
  }
};
