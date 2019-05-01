const Discord = require('discord.js');
const fs = require('fs-extra');
const Enmap = require('enmap');

//const { secret } = require('../.env');

const client = new Discord.Client({ forceFetchUser: true });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Enmap();

const init = async () => {
  const cmds = await fs.readdir('src/commands');
  console.log('LIGA BOT VIADO');

  cmds.map(f => {
    try{
      const props = require(`./commands/${f}`);

      if(f.split('.').slice(-1)[0] !== 'js') return;
      if (props.init) {
        console.log('alo');
        props.init(client);
      }
      
      client.commands.set(props.command.name, props);
    }catch(e) {
      console.log('deu ruim');
    }
  });

  const evt = await fs.readdir('src/events');
  evt.map(f => {
    const eventName = f.split('.')[0];

    const event = require(`./events/${eventName}`);

    client.on(eventName, event.bind(null, client));
  });

  client.on('error', err => console.log(err));
  //client.login(secret);
  client.login(process.env.secret);
}

init();

module.exports = client.commands;
