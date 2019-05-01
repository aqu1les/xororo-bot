const Discord = require('discord.js');
const db = require('../db/dao');

async function inc_xesque(xesques, id) {
    await db.run(`UPDATE users SET XESQUES=${xesques+1} WHERE ID=${id};`, err => {
        if(err) console.log(err);
    });
}
async function create_user(ID, NAME) {
    db.run(`INSERT INTO users(ID, NAME, XESQUES) VALUES('${ID}', '${NAME}', '1')`, err => {
        if(err) console.log(err);
    });
}
module.exports = {
    run: (client, message) => {
        message.channel.send('no xesquedele');
             
        db.all(`SELECT * FROM users WHERE ID=${message.author.id} LIMIT 1 ;`, async (err, user) => {
            if(err) return console.log(err);
            if(user.length > 0) {
                message.channel.send(`Você xamou no xesque ${user[0].XESQUES+1} vezes !`);
                inc_xesque(user[0].XESQUES, user[0].ID);
            } else {
                message.reply(`Você xamou no xesque pela primeira vez !`);
                create_user(message.author.id, message.author.username);
            }
        });
        return;
    },
    get command() {
        return {
            name: 'xama',
            usage: 'xama'
        }
    }
}