const Discord = require('discord.js');
const fs = require('fs-extra');
const Enmap = require('enmap');

const { secret } = require('../.env');

const client = new Discord.Client({ forceFetchUser: true });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.commands = new Enmap();

const init = async () => {
  const cmds = await fs.readdir('src/commands');
  console.log('LIGA BOT VIADO');

  cmds.shift();
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
  })

  const evt = await fs.readdir('src/events');
  evt.map(f => {
    const eventName = f.split('.')[0];

    const event = require(`./events/${eventName}`);

    client.on(eventName, event.bind(null, client));
  })
  
  client.on('error', err => console.log(err));
  client.login(secret);
}

// client.on('message', message => {
//     if(!message.guild) return;
//     if (message.content === '!join') {
//         if(message.member.voiceChannel.full) return message.reply('The voice channel is full');
//         if (message.member.voiceChannel) {
//           message.member.voiceChannel.join()
//             .then(connection => {
//               message.reply('Connected to the channel!');
//             })
//             .catch(console.log);
//         } else {
//           message.reply('You need to join a voice channel first!');
//         }
//       }
//     if(message.content === '!leave') {
//         const bot = message.member.voiceChannel.members.find((gM) => {
//             if(gM.id == '572212832943472642') return true;
//         });
//         if(bot){
//             message.member.voiceChannel.leave();
//         }else{
//             message.reply('Im not connected to a voice channel!');
//         } 
//     }
// });

init();

module.exports = client.commands;

// client.on('guildMemberAdd', member => {
//     member.send('Welcomido ao servidor, qualquer dúvida vai tomar no cu');
//     member.setRoles(['Plebeus']);
// });




//client.login('mfa.mAFIEPhmquF7osxQtrJMhGDGF4ydZOHelNVec__m1_En23IeFDQtPI_lUSSQOJmmRNh5fV26AHVXii79u2hj')