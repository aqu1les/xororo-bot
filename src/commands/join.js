const Discord = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = {
    run: (client, message) => {
        if(!message.guild.voiceConnection){
            message.member.voiceChannel.join().then(connection => {
                message.channel.send(`Joined the VoiceChannel "${connection.channel.name}" !`);
            });
        } else {
            if(message.guild.voiceConnection.channel.name == message.member.voiceChannel.name ) {
                return message.channel.send(`Already connected to your channel !`);
            } else {
                message.member.voiceChannel.join().then(connection => {
                    message.channel.send(`Joined the VoiceChannel "${connection.channel.name}" !`);
                })
            }
        }
        return;
    },
    get command() {
        return {
            name: 'join',
            usage: 'join'
        }
    }
}