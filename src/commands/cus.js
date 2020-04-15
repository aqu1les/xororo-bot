const Discord = require('discord.js');
const User = require("../model/User");

async function get_cus_comidos(id, username) {
    const user = await User.findOne({ uid: id });

    if (user) {
        let resp = {};

        if(user.cus_comidos.length > 0) {

            user.cus_comidos.forEach(id => {
                resp[id] = resp[id] ? resp[id] + 1 : 1;
            });

            console.log(resp);

            let response_string = '';

            for(let user in resp) {
                response_string += `\n Você comeu o cu de ${user} ${resp[user]}x`;
            }
            resp = response_string;
        } else {
            resp = 'você ainda não comeu o cu de ninguém';
        }

        return resp;
    } else {
        await User.create({ uid: id, name: username });

        return 'você ainda não comeu o cu de ninguém';
    }
}

module.exports = {
    run: async (client, message, args) => {
        const response = await get_cus_comidos(message.author.id, message.author.username);

        message.reply(response);
    },
    get command() {
        return {
            name: 'cus',
            usage: 'cus'
        }
    }
}