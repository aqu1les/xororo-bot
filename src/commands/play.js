const Discord = require('discord.js');
const ytdl = require('ytdl-core');
const fs = require('fs');

function play(queue, connection) {
    queue.map(async music => {
        const dispatcher = await connection.playStream(ytdl(music, {filter: "audioonly"}));
        dispatcher.setVolume(0.1);
        dispatcher.on('error', e => {
            console.log(e);
        });
        dispatcher.on('end', () => {
            queue.shift();
            if(queue.length === 0)  connection.disconnect();
        });
    });     
}
module.exports = {
    run: (client, message, args) => {

        if(args.length !== 0){
            message.member.voiceChannel.join().then(connection => {
                message.reply('Joined your voice channel !');
                play(args, connection);
            });
        } else {
            if(!message.guild.voiceConnection) return;
            if(message.guild.voiceConnection.player){
                message.guild.voiceConnection.player.dispatcher.resume();
            }
        }
        
    },
    get command() {
        return {
            name: 'play',
            usage: 'play'
        }
    }
}