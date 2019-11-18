const { Client, RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core');
const ytsr = require("ytsr");
const ytpl = require('ytpl');

let ytQueue = [];

async function play(connection, message) {
    music = ytQueue[0];
    const embed = new RichEmbed()
        .setColor("#e80a21")
        .setTitle(`Vo toca essa braba aqui`)
        .setDescription(music.title)
        .setThumbnail(music.thumbnail)
        .setFooter("aqu1les", "https://i.imgur.com/FYaQiTu.jpg")
        .setTimestamp()

    message.channel.send(embed);
    const dispatcher = await connection.playStream(ytdl(music.link || music.url, { filter: "audioonly" }));
    dispatcher.setVolume(1);
    dispatcher.on('error', e => {
        console.log(e);
    });
    dispatcher.on('end', () => {
        ytQueue.shift();
        play(connection, message);
        if (ytQueue.length === 0) return connection.disconnect();
    });
}

module.exports = {
    run: (client, message, args) => {
        if (args.length !== 0) {
            if (args.length === 1 && ytpl.validateURL(args[0])) {
                return ytpl(args[0], (err, playlist) => {
                    if (err) return message.channel.send("deu pra carregar a playlist nao irmao");
                    message.member.voiceChannel.join()
                        .then(connection => {
                            message.reply("vo lansa as braba fodase");
                            playlist.items.map(item => ytQueue.push(item));
                            play(connection, message);
                        }).catch(err => {
                            return message.reply("deu pra tocar nao flw");
                        });
                });
            } else {
                message.member.voiceChannel.join()
                    .then(async connection => {
                        message.reply('chego chegando');
                        let musics = await ytsr(args[0]);
                        musics = musics.items.filter(item => item.type === "video");
                        ytQueue.push(musics[0]);
                        play(connection, message);
                    }).catch(err => {
                        return message.reply("deu pra tocar nao flw");
                    });
            }
        } else {
            if (!message.guild.voiceConnection) return;
            if (message.guild.voiceConnection.player) {
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
