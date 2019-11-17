const Discord = require('discord.js');
const User = require("../model/User");

async function inc_xesque(id, username) {
    const user = await User.findOne({ uid: id });
    if (user) {
        user.xesques = user.xesques + 1;
        await user.save();
        return user.xesques;
    } else {
        await User.create({ uid: id, name: username, xesques: 1 });
        return 1;
    }
}
module.exports = {
    run: async (client, message) => {
        const xesques = await inc_xesque(message.author.id, message.author.username);
        if (xesques === 1) return message.reply(`xamou no xesque pela primeira vez!`);
        return message.channel.send(`Você xamou no xesque ${xesques} vezes !`);
    },
    get command() {
        return {
            name: 'xama',
            usage: 'xama'
        }
    }
}