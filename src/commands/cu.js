const Discord = require('discord.js');

module.exports = {
    run: async (client, message, args) => {
        message.reply(` você tem ${Math.random() * 100} de chances de comer o cu de ${args}`)
    },
    get command() {
        return {
            name: 'cu',
            usage: 'cu'
        }
    }
}