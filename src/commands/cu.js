const Discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        if (Array(args).length == 0) return message.reply(" marque a pessoa que você gostaria de comer o cu.");
        if (String(args[0]).substring(0, 2) !== "<@") return message.reply(" por favor marque a pessoa que você gostaria de comer o cu.");
        const chances = Math.round(Math.random() * 100);
        if (chances === 100) {
            return message.reply(` com ${chances}% de chances, você comeu o cu de ${args}. Parabéns!`);
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