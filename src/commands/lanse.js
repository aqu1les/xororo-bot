const Discord = require('discord.js');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    xesques: Number,
    brabas: Number
});
const User = mongoose.model('user', UserSchema);

async function inc_brabas(id, username) {
    const user = await User.findOne({ uid: id });
    if (user) {
        user.brabas = user.brabas + 1;
        await user.save();
        return user.brabas;
    } else {
        await User.create({ uid: id, name: username, brabas: 1 });
        return 1;
    }
}

module.exports = {
    run: async (client, message, args) => {
        const brabas = await inc_brabas();
        if (brabas === 1) return message.reply(`lansou a braba pela primeira vez!`);
        return message.channel.send(`Você lansou a braba ${brabas} vezes, fdp`);
    },
    get command() {
        return {
            name: 'lanse',
            usage: 'lanse'
        }
    }
}