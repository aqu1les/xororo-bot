const Discord = require('discord.js');
const { currentCommands } = require('../commands.js');

module.exports = {
    run: (client, message, args) => {
        
        if(!args[0]) {
            message.author.send(currentCommands.map(command => command));
            return;
        }

    },
    get command() {
        return {
            name: 'comandos',
        }
    }
}