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
  run: async (client, message, args) => {
    message.author.send(await getFormattedCommands());
  },
  get command() {
    return {
      name: 'comandos',
      usage: 'comandos'
    };
  }
};
