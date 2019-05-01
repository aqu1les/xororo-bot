const Discord = require('discord.js');
const { currentCommands } = require('../commands.js');

module.exports = {
    run: (client, message, args) => {
        message.author.send(currentCommands);
    },
    get command() {
        return {
            name: 'comandos',
            usage: 'comandos'
        }
    }
}