const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const currentCommands = ['ping', 'xama', '!pvt', '!oi'];

client.on('message', message => {
  if (message.content === 'ping') {
    message.channel.send('pong');
  }else if (message.content === 'xama') {
    message.channel.send('no xesque');
  } else if(message.content === '!pvt') {
    message.reply(message.author.avatarURL);
  } else if(message.content === "!oi") {
    message.author.send('Eai');
  } else if(message.content === "!comandos") {
      message.author.send(currentCommands);
  } else if (message.content === 'que?' || message.content === 'q?' || message.content === 'Que?'|| message.content === 'Q' || message.content === 'QUE'|| message.content === 'q')
  {
      message.channel.send('pau no seu cu :microphone: ');
  }

});
client.on('message', message => {
    if(!message.guild) return;
    if (message.content === '!join') {
        if(message.member.voiceChannel.full) return message.reply('The voice channel is full');
        if (message.member.voiceChannel) {
          message.member.voiceChannel.join()
            .then(connection => {
              message.reply('Connected to the channel!');
            })
            .catch(console.log);
        } else {
          message.reply('You need to join a voice channel first!');
        }
      }
    if(message.content === '!leave') {
        const bot = message.member.voiceChannel.members.find((gM) => {
            if(gM.id == '572212832943472642') return true;
        });
        if(bot){
            message.member.voiceChannel.leave();
        }else{
            message.reply('Im not connected to a voice channel!');
        } 
    }
});

client.on('message', message => {
    const test = message.content.substr(message.content.length-2, message.content.length-1);
    if(test === 'ão' && message.author.username !== client.user.username) {
        return message.channel.send('Meu pau na sua mão');
    }
})


client.on('message', message => {
    if(message.content === "!Oi")
        message.author.sendMessage('Eai');
});
client.on('guildMemberAdd', member => {
    member.send('Welcomido ao servidor, qualquer dúvida vai tomar no cu');
    member.setRoles(['Plebeus']);
});


client.login('NTcyMjEyODMyOTQzNDcyNjQy.XMZBJw.PF0fhwdoIBNA3NOc_kuTVuAyzgg');
//client.login('mfa.mAFIEPhmquF7osxQtrJMhGDGF4ydZOHelNVec__m1_En23IeFDQtPI_lUSSQOJmmRNh5fV26AHVXii79u2hj')