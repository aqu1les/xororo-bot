const Discord = require('discord.js');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    uid: String,
    name: String,
    xesques: Number
});

const User = mongoose.model('user', UserSchema);

async function inc_xesque(id, username) {
    const user = await User.find({ uid: id });
    if (user) {
        user.set({ xesques: user.xesques + 1 });
        user.save()
            .then(u => {
                return u.xesques;
            })
            .catch(err => console.log(err));
    } else {
        User.create({ uid: id, name: username, xesques: 1 })
            .then(u => {
                return u.xesques;
            })
            .catch(err => console.log(err));
    }
}
module.exports = {
    run: (client, message) => {
        const xesques = inc_xesque(message.author.id, message.author.username);
        return message.channel.send(`Você xamou no xesque ${xesques} vezes !`);
    },
    get command() {
        return {
            name: 'xama',
            usage: 'xama'
        }
    }
}