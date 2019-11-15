const Discord = require('discord.js');
const fs = require('fs-extra');

module.exports = {
    run: async (client, message, args) => {
        const cmds = await fs.readdir("src/commands");
        let resp = [];
        cmds.map(cmd => {
            resp.push(`!${cmd.split('.')[0]}`);
        });
        message.author.send(resp);
    },
    get command() {
        return {
            name: 'comandos',
            usage: 'comandos'
        }
    }
}