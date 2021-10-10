const Discord = require('discord.js');
const fs = require('fs-extra');
const mongoose = require('mongoose');
require('dotenv/config');

const client = new Discord.Client({
  forceFetchUser: true,
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES
  ]
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setActivity('meu dono fazer merda no meu código', {
    type: 'WATCHING'
  });

  /** @var {Discord.ApplicationCommandDataResolvable[]} */
  const commands = [...client.commands.entries()].map(([key, props]) => ({
    name: key,
    description: props.command.description,
    options: props.command.options
  }));

  client.guilds.cache.each((guild) =>
    guild.commands.set(commands).catch((error) => console.log(error))
  );
});

client.commands = new Map();

const init = async () => {
  const cmds = await fs.readdir('src/commands');

  mongoose
    .connect(
      `mongodb+srv://aqu1les:${process.env.DB_PASSWORD}@cluster0-kvfg5.mongodb.net/xororo?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    )
    .then(() => console.log('Connected to mongodb Atlas'))
    .catch((err) => console.log(err));

  cmds.map((f) => {
    try {
      const props = require(`./commands/${f}`);
      if (f.split('.').slice(-1)[0] !== 'js') return;
      client.commands.set(props.command.name, props);
    } catch (e) {
      console.log('deu ruim ' + e);
    }
  });

  const evt = await fs.readdir('src/events');
  evt.map((f) => {
    const eventName = f.split('.')[0];

    const event = require(`./events/${eventName}`);

    client.on(eventName, event.bind(null, client));
  });

  client.on('error', (err) => console.log(err));
  client.login(process.env.DISCORD_SECRET);
};

init();

module.exports = client.commands;
