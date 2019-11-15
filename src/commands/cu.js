const Discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        const chances = Math.round(Math.random() * 100);
        if (chances === 100) {
            message.reply(` com ${chances}% de chances, você comeu o cu de ${args}. Parabéns!`);
        }
        message.reply(` você tem ${chances}% de chances de comer o cu de @${args}.`);
    },
    get command() {
        return {
            name: 'cu',
            usage: 'cu'
        }
    }
}